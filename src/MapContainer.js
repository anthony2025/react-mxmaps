/* global google */
import React, {Component} from 'react'
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react'
import MARKERS from './markers'
import parseMarkers from './parseMarkers'

const geocoder = new google.maps.Geocoder()
const FEW_MARKERS = [MARKERS[0], MARKERS[1], MARKERS[2], MARKERS[3], MARKERS[4]]

export default class MapContainer extends Component {
  static defaultProps = {
    center: {
      lat: 19.39,
      lng: -99.28
    },
    zoom: 10
  }

  state = {
    markers: []
  }

  componentDidMount = () => {
    FEW_MARKERS.map(marker => this.parseMarker(marker))
  }

  parseMarker = marker => {
    geocoder.geocode({address: marker.address}, (results, status) => {
      if (status === 'OK') {
        let newMarker = {
          text: marker.name,
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }
        this.setState(this.pushMarkerToState(newMarker))
      } else {
        console.warn(
          'Geocode was not successful for the following reason: ' + status
        )
      }
    })
  }

  pushMarkerToState = marker => state => ({
    ...state,
    markers: [...state.markers, marker]
  })

  renderMarkers = () =>
    this.state.markers.map(marker =>
      <Marker
        lat={marker.lat}
        lng={marker.lng}
        text={marker.text}
        key={marker.text}
      />
    )

  render() {
    return (
      <GoogleMap
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        {this.renderMarkers}
        <Marker
          lat={this.props.center.lat}
          lng={this.props.center.lng}
          text="placeholder"
          key="placeholder"
        />
      </GoogleMap>
    )
  }
}

const GoogleMap = styled(GoogleMapReact)``
const Marker = styled.div`
  height: 25px;
  width: 25px;
  background-color: magenta;
`
