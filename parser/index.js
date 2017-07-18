const API_KEY = 'AIzaSyCg3F0GK2ATupossVbQAbcKHPTaMrf_Dik'
const googleMapsClient = require('@google/maps').createClient({key: API_KEY})
const fs = require('fs')

const rawMarkers = 'rawMarkers.json'
const parsedMarkers = 'parsedMarkers.json'

function appendLineToFile(file, appendLineToFile) {
  fs.appendFile(file, line, err => {
    if (err) return console.log(err)
    console.log('Line appended succesfully')
  })
}

const marker = {
  name: 'Red Barn Stores 3858-CUAJIMALPA',
  address: 'CALZADA IGNACIO ZARAGOZA NO. 846'
}

// Takes ambiguous address, returns best prediction as a placeId
function getPlaceId(marker) {
  googleMapsClient.placesAutoComplete({input: marker.address}, (err, res) => {
    if (err) return console.log('Geocode failed: ' + res.status)
    if (res.json.status !== 'OK') return console.log(res.json.status)
    let placeId = res.json.predictions[0].place_id
    console.log('placeId: ', placeId)
    getCoords(placeId)
  })
}

// Takes placeId, returns marker object with coordinates {text, lat, lng}
function getCoords(placeId) {
  googleMapsClient.place({placeid: placeId}, (err, res) => {
    if (err) return console.log('Geocode failed: ' + res.status)
    if (res.json.status !== 'OK') return console.log(res.json.status)
    let coordinates = res.json.result.geometry.location
    let markerWithCoords = {
      text: marker.name,
      lat: coordinates.lat,
      lng: coordinates.lng
    }
    appendLineToFile(parsedMarkers, markerWithCoords)
    console.log(markerWithCoords)
  })
}

// UNUSED: saves an step but only works for unambiguous results
// Takes a marker object {name, address}, returns a marker object {text, lat, lng}
function getMarkerWithCoords(marker) {
  googleMapsClient.geocode({address: marker.address}, (err, res) => {
    if (err) return console.log('Geocode failed: ' + res.status)
    if (res.json.status !== 'OK') return console.log(res.json.status)
    let result = res.json.results[0]
    let markerWithCoords = {
      text: marker.name,
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng
    }
    console.log(JSON.stringify(markerWithCoords))
  })
}

fs.readFile(rawMarkers, 'utf8', (err, data) => {
  let parsedData = JSON.parse(data)
  parsedData.map(marker => getPlaceId(marker))
})
