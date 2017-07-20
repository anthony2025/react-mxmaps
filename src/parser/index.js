// This script tries its darnest to geocode our markers. It converts our json
// array of ambiguous markers {name, address} into unambiguous markers {text,
// lat, lng} that we can render in a map.
const {addressToCoordinates} = require('./apiCalls')
const {appendLineToFile, readFileSync} = require('./fileSystem')

// path.join is already handled in fileSystem
const RAW_MARKERS_FILENAME = '../data/raw_markers.json'
// REMEMBER: make sure to correct syntax here between passes
// This could be automated, but it takes 7 keystrokes, I counted
const PARSED_MARKERS_FILENAME = '../data/parsed_markers.json'

// We are going to keep trimming the addresses of our markers, which makes them
// more general, until a match for each is found. See README.md for more info
const rawMarkers = readFileSync(RAW_MARKERS_FILENAME)
const pastFoundNames = readFileSync(PARSED_MARKERS_FILENAME).map(o => o.text)
const justFoundNames = []

// TRIM_STEPS is how many characters to trim the marker in each step, choosing
// too low a value might make the results slightly more reliable, but will eat
// away your API use quota. Start first pass at around 20 and keep lowering each
// pass by around 5 until you get to 1. This process can be automated, but its
// nice to have this extra step to control your use quota.
const TRIM_STEPS = 1
const MAX_CHARACTERS_PER_LINE = 200
const MAX_PASSES = Math.floor(MAX_CHARACTERS_PER_LINE / TRIM_STEPS)

function isNewRecord(name) {
  let isNewOnThisRound = justFoundNames.indexOf(name) === -1
  let isNewOnPastRounds = pastFoundNames.indexOf(name) === -1
  return isNewOnPastRounds && isNewOnThisRound
}

function trimMarkerAddress(marker, howManyChars) {
  return {
    address: marker.address.slice(0, -howManyChars),
    name: marker.name
  }
}

function saveRecord(coordinates, name) {
  // Final paranoid check
  if (!name || !coordinates || !coordinates.lat || !coordinates.lng) {
    console.log('error, invalid marker trying to be saved', name, coordinates)
  }
  let newMarker = {
    text: name,
    lat: coordinates.lat,
    lng: coordinates.lng
  }
  appendLineToFile(PARSED_MARKERS_FILENAME, newMarker)
  justFoundNames.push(name)
}

rawMarkers.map(marker => {
  // First check, if the marker has already been found, skip
  // Can't really have enough early breaks to save API quota
  if (!isNewRecord(marker.name)) return
  // Cloning the marker to avoid problems working with references
  let currentMarker = {address: marker.address, name: marker.name}

  for (let i = 0; i < MAX_PASSES; i++) {
    // If the marker is found in the last iteration of the loop, abort the loop
    if (!isNewRecord(currentMarker.name)) break
    // Update our copy of marker to trim its address
    currentMarker = trimMarkerAddress(currentMarker, TRIM_STEPS)
    // If we trimmed too much, abort the loop
    if (currentMarker.address.length <= 0) break
    // Only then ask the API to identify our marker
    addressToCoordinates(currentMarker.address, coordinates => {
      console.log('Api call for: ', marker.name)
      if (coordinates && coordinates.lat && coordinates.lng) {
        // Paranoid check to avoid stubborn duplicates
        if (isNewRecord(currentMarker.name))
          saveRecord(coordinates, marker.name)
      }
    })
  }
})
