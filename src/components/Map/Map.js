import React, {Component} from 'react'
import PropTypes from 'prop-types'

import GoogleMap from 'google-map-react'
import Marker from 'components/Marker'
import markerList from 'data/final_markers'

export default class MapContainer extends Component {
  static propTypes = {
    apiKey: PropTypes.string.isRequired,
    center: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired,
    zoom: PropTypes.number.isRequired
  }

  static defaultProps = {
    apiKey: process.env.REACT_APP_GAPI_KEY,
    center: {
      lat: 19.39,
      lng: -99.16
    },
    zoom: 10
  }

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
        {this.renderMarkers(markerList)}
      </GoogleMap>
    )
  }
}
