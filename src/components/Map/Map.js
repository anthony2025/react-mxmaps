import React, {Component} from 'react'
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react'

export default class MapContainer extends Component {
  static defaultProps = {
    apiKey: process.env.REACT_APP_GAPI_KEY,
    center: {
      lat: 19.39,
      lng: -99.28
    },
    zoom: 10
  }

  // TODO still working on server side parsing
  renderMarkers = markers =>
    markers.map(marker =>
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
        bootstrapURLKeys={{key: this.props.apiKey}}
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
  height: 20px;
  width: 20px;
  background-color: magenta;
`
