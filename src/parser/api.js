// We are going to pass our markers through the Places Autocomplete API to try
// and get an unambiguos placeId result, and only then geocode the address with
// Places Details API. This multi step processes gives us the best chance to
// succesfully find a match for ambiguous or loosely typed addreses

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.REACT_APP_GAPI_KEY
})

// We set here the boundaries of our requests, this really improves our search
// efficacy and accuracy
const SEARCH_OPTIONS = {
  location: {
    lat: 19.39,
    lng: -99.16
  },
  components: {country: 'mx'},
  radius: 40000, // in meters
  strictbounds: true // change to false if you don't care about accuracy
}

// Takes an ambiguous address, returns a coordinates object {lat, lng}
function addressToCoordinates(address, cb) {
  if (!address) return cb(null)
  getPlaceId(address, placeId => {
    if (!placeId) return cb(null)
    getCoords(placeId, coordinates => {
      if (!coordinates) cb(null) // This might be unnecessary...
      return cb(coordinates)
    })
  })
}

// Takes ambiguous address, returns best prediction as a placeId
function getPlaceId(address, cb) {
  if (!address) return cb(null)
  googleMapsClient.placesAutoComplete(
    Object.assign({input: address}, SEARCH_OPTIONS),
    (err, res) => {
      if (err) return console.log('getPlaceId failed: ' + res.status)
      if (res.json.status !== 'OK') return cb(null)
      // console.log('getPlaceId returns: ', placeId)
      let placeId = res.json.predictions[0].place_id
      cb(placeId)
    }
  )
}

// Takes placeId, returns coordinates object {lat, lng}
function getCoords(placeId, cb) {
  if (!placeId) return cb(null)
  googleMapsClient.place({placeid: placeId}, (err, res) => {
    if (err) return console.log('getCoords failed: ' + res.status)
    if (res.json.status !== 'OK') return cb(null)
    // console.log('getCoords returns: ', JSON.stringify(coordinates))
    let coordinates = res.json.result.geometry.location
    cb(coordinates)
  })
}

// UNUSED: saves an step but only works for unambiguous results
// Takes a unambiguous marker object {name, address}, returns a marker object {text, lat, lng}
function dumbGetMarkerWithCoords(marker, cb) {
  googleMapsClient.geocode({address: marker.address}, (err, res) => {
    if (err) return console.log('dumbGetMarkerWithCoords failed: ' + res.status)
    if (res.json.status !== 'OK') return console.log(res.json.status)
    const result = res.json.results[0]
    const markerWithCoords = {
      text: marker.name,
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng
    }
    cb(markerWithCoords)
  })
}

module.exports = {getCoords, getPlaceId, addressToCoordinates}
