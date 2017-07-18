import React, {Component} from 'react'
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react'

export default class MapContainer extends Component {
  static defaultProps = {
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
