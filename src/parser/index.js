// This script tries its darnest to geocode our markers. Takes an array of
// ambiguous markers {name, address} and returns unambiguous markers {text, lat,
// lng}. We are going to keep trimming the addresses of our markers, which makes
// them more general, until a match for each is found.

const {addressToCoordinates} = require('./api')
const fs = require('fs')
const path = require('path')

console.log('LOADING FILES...')
const RAW_FILENAME = path.join(__dirname, '../data/raw_markers.json')
const PARSED_FILENAME = path.join(__dirname, '../data/parsed_markers.json')

// Loading our files and filtering out the markers we already found
const rawMarkers = require(RAW_FILENAME)
const parsedMarkers = require(PARSED_FILENAME)
const parsedMarkerNames = parsedMarkers.map(marker => marker.text)
const markersToParse = rawMarkers.filter(marker =>
  parsedMarkerNames.includes(marker.name)
)

// TRIM_STEPS is how many characters to remove from the address in each
// iteration, you can use a larger value to prevent it eating away your API use
// quota, but the results will suffer.
const TRIM_STEPS = 5
const MAX_CHARACTERS_PER_LINE = 200
const MAX_PASSES = Math.floor(MAX_CHARACTERS_PER_LINE / TRIM_STEPS)
// Minimum character length for address at which to cut the search
const MINIMUM_ADDRESS_LENGTH = 10

const markersFoundOnThisRun = []
const isNewRecord = name => markersFoundOnThisRun.includes(name)

const saveRecord = marker => {
  console.log('marker found')
  markersFoundOnThisRun.push(marker.text)
  // ineficient, but until we change to promises this is the safest way
  const contents = require(PARSED_FILENAME)
  contents.push(marker)
  const serializedContents = JSON.stringify(contents)
  fs.writeFileSync(PARSED_FILENAME, serializedContents)
  console.log('marker appended', marker.text)
}

markersToParse.map(marker => {
  for (let i = 0; i < MAX_PASSES; i++) {
    // If the marker is found in the last iteration of the loop, abort the loop
    if (!isNewRecord(marker.name)) break
    // Trim the address
    marker.address = marker.address.slice(0, -TRIM_STEPS)
    // If we trimmed too much, abort the loop
    if (marker.address.length <= MINIMUM_ADDRESS_LENGTH) {
      console.log('failed to find: ', marker.name)
      break
    }

    // Ask the API to identify our marker
    console.log('Api call for: ', marker.name)
    addressToCoordinates(marker.address, coordinates => {
      // Last check to avoid delayed duplicates due to the async calls
      if (
        coordinates &&
        coordinates.lat &&
        coordinates.lng &&
        isNewRecord(marker.name)
      ) {
        // building our new marker structure
        saveRecord({
          text: marker.name,
          lat: coordinates.lat,
          lng: coordinates.lng
        })
      }
    })
  }
})

process.exit(0)
