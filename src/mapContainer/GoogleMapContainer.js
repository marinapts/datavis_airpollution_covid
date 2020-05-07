/* global google */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'

import './mapContainer.scss'

class GoogleMapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      heatmapVisible: true,
      center: {lat: 54.5260, lng: 15.2551},  // center of Europe
      zoom: 4
    }
  }

  createMapOptions = (maps) => {
    const darkMode = [
      {elementType: 'geometry', stylers: [{color: '#212121'}]},
      {elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#757575'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#212121'}]},
      {featureType: "administrative", "elementType": "geometry", "stylers": [{"color": "#757575"}]},
      {featureType: "administrative.country", "elementType": "labels.text.fill", "stylers": [{"color": "#9e9e9e"}]},
      {featureType: "administrative.locality", "elementType": "labels.text.fill", "stylers": [{"color": "#bdbdbd"}]},
      {featureType: "poi", "elementType": "labels.text.fill", "stylers": [{"color": "#757575"}]},
      {featureType: "poi.park", "elementType": "geometry", "stylers": [{"color": "#181818"}]},
      {featureType: "poi.park", "elementType": "labels.text.fill", "stylers": [{"color": "#616161"}]},
      {featureType: "poi.park", "elementType": "labels.text.stroke", "stylers": [{"color": "#1b1b1b"}]},
      {featureType: "road", "stylers": [ {"visibility": "off"}]},
      {featureType: "road", "elementType": "geometry.fill", "stylers": [{"color": "#2c2c2c"}]},
      {featureType: "road", "elementType": "labels.text.fill", "stylers": [{"color": "#8a8a8a"}]},
      {featureType: "road.arterial", "elementType": "geometry", "stylers": [{"color": "#373737"}]},
      {featureType: "road.highway", "elementType": "geometry", "stylers": [{"color": "#3c3c3c"}]},
      {featureType: "road.highway.controlled_access", "elementType": "geometry", "stylers": [{"color": "#4e4e4e"}]},
      {featureType: "road.local", "elementType": "labels.text.fill", "stylers": [{"color": "#616161"}]},
      {featureType: "transit", "elementType": "labels.text.fill", "stylers": [{"color": "#757575"}]},
      {featureType: "water", "elementType": "geometry", "stylers": [{"color": "#000000"}]},
      {featureType: "water", "elementType": "labels.text.fill", "stylers": [{"color": "#3d3d3d"}]}
    ]

    return {
      panControl: false,
      mapTypeControl: true,
      scrollwheel: true,
      styles: darkMode,
    }
  }

  processPositions = positions => {
    return positions.map(pos => ({
        lat: pos.Latitude,
        lng: pos.Longitude,
        weight: pos.AirQualityLevel/(positions.length)
      })
    )
  }

  getHeatmapData = airPollutionData => {
    let positions = []
    if (airPollutionData) {
      for (const values of Object.values(airPollutionData)) {
        positions = positions.concat(values)
      }
      positions = this.processPositions(positions)
    }

    return {
      positions,
      options: { radius: 15, opacity: 0.6,
        gradient: [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
        ]
      }
    }
  }

  render() {
    const { center, zoom } = this.state
    const heatMapData = this.getHeatmapData(this.props.airPollutionData)
    const gradient = heatMapData.options.gradient.join(',')

    return (
      <div style={{position: 'relative', width: '100%', height: '100%'}}>
        <GoogleMapReact
          ref={(el) => this._googleMap = el}
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY, libraries: 'visualization'}}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          heatmapLibrary={true}
          heatmap={heatMapData}
          options={this.createMapOptions}
        />
        <div id="legend">
          <div className="legend-text">Low NO<sub>2</sub> Level (0 ug/m<sup>3</sup>)</div>
          <div className="map-legend-colours" style={{background: 'linear-gradient(to right,' + gradient}}></div>
          <div className="legend-text">High NO<sub>2</sub> Level (125 ug/m<sup>3</sup>)</div>
        </div>
        <div id="title">
          <h2>NO<sub>2</sub> Levels during the Covid-19 Pandemic in Europe</h2>
        </div>
      </div>
    )
  }
}

export default GoogleMapContainer

GoogleMapContainer.propTypes = {
  airPollutionData: PropTypes.object, // air pollution data for all weeks and countries
}
