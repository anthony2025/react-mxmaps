/* global google */
const geocoder = new google.maps.Geocoder()

// Converts an array of objects [{name, address}] into an array of objects [{text, lat, lng}]
export default markers => {
  return markers.map(marker => parseMarker(marker))
}

// Converts a single object {name, address} into a single object {text, lat, lng}
function parseMarker(marker) {
  let result = {
    text: marker.name,
    lat: undefined,
    lng: undefined
  }
  geocoder.geocode({address: marker.address}, (results, status) => {
    if (status === 'OK') {
      result.lat = results[0].geometry.location.lat()
      result.lng = results[0].geometry.location.lng()
    } else {
      console.warn(
        'Geocode was not successful for the following reason: ' + status
      )
    }
  })
  return result
}
