/* global google */

import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

class GoogleMapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      heatmapVisible: true,
      center: {lat: 42.232294, lng: 13.607275},
      zoom: 6
    }
  }

  onMapClick = ({x, y, lat, lng, event}) => {
    console.log('this._googleMap', this._googleMap)
    if (this._googleMap !== undefined) {
      const point = new google.maps.LatLng(lat, lng)
      console.log(this._googleMap)
      this._googleMap.heatmap.data.push(point)
    }
  }

  // toggleHeatMap = () => {
  //   this.setState({
  //     heatmapVisible: !this.state.heatmapVisible
  //   },
  //   () => {
  //     if (this._googleMap !== undefined) {
  //       this._googleMap.heatmap.setMap(this.state.heatmapVisible ?
  //         this._googleMap.map_ : null)
  //     }
  //   })
  // }

  handleApiLoaded = (map, maps) => {
    // use map and maps objects
    console.log(map, maps)
  }

  createMapOptions = (maps) => {
    const colors = {
      labels: '#d59563',
      water: '#17263c',
      ground: '#242f3e',
      park: '#6b9a76',
      highwayLabel: '#f3d19c'
    }

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

    var nightMode = [
      {elementType: "geometry", stylers: [{color: colors.ground}]},
      {elementType: "labels.text.stroke", stylers: [{color: colors.ground}]},
      {elementType: "labels.text.fill", stylers: [{color: "#746855"}]},
      {featureType: "administrative.locality", "elementType": "labels.text.fill", stylers: [{color: colors.labels}]},
      {featureType: "poi", elementType: "labels.text.fill", stylers: [{color: colors.labels}]},
      {featureType: "poi.park", elementType: "geometry", stylers: [{color: "#263c3f"}]},
      {featureType: "poi.park", elementType: "labels.text.fill", stylers: [{color: "#6b9a76"}]},
      {featureType: "road", elementType: "geometry", stylers: [{color: "#38414e"}]},
      {featureType: "road", elementType: "geometry.stroke", stylers: [{color: "#212a37"}]},
      {featureType: "road", elementType: "labels.text.fill", stylers: [{color: "#9ca5b3"}]},
      {featureType: "road.highway", elementType: "geometry", stylers: [{color: "#746855"}]},
      {featureType: "road.highway", elementType: "geometry.stroke", stylers: [{color: "#1f2835"}]},
      {featureType: "road.highway", elementType: "labels.text.fill", stylers: [{color: "#f3d19c"}]},
      {featureType: "transit", elementType: "geometry", stylers: [{color: "#2f3948"}]},
      {featureType: "transit.station", elementType: "labels.text.fill", stylers: [{color: colors.labels}]},
      {featureType: "water", elementType: "geometry", stylers: [{color: "#17263c"}]},
      {featureType: "water", elementType: "labels.text.fill", stylers: [{color: "#515c6d"}]},
      {featureType: "water", elementType: "labels.text.stroke", stylers: [{color: "#17263c"}]}
    ]
    return {
      panControl: false,
      mapTypeControl: true,
      scrollwheel: true,
      // styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
      styles: darkMode,
    }
  }

  render() {
    const { center, zoom } = this.state
    const heatMapData = {
      // positions: [
      //   {lat: 55.5, lng: 34.56, weight: 0},
      //   {lat: 34.7, lng: 28.4, weight: 6}
      // ],
      positions: this.props.airPollutionData,
      options: { radius: 15, opacity: 0.6 }
    }

    return (
      <div style={{width: '100%', height: '800px'}}>
        <GoogleMapReact
          ref={(el) => this._googleMap = el}
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY, libraries: 'visualization'}}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          heatmapLibrary={true}
          heatmap={heatMapData}
          onClick={this.onMapClick}
          options={this.createMapOptions}
          // onGoogleApiLoaded={({map, maps}) => {
          //   console.log(points);
          //   const heatmap = new maps.visualization.HeatmapLayer({
          //     data: points.map(point => (
          //       {location: new maps.LatLng(point['location'][1], point['location'][0]),
          //       weight: point['weight']}))
          //   });
          //   heatmap.setMap(map);
          // }}
        />
      </div>
    )
  }
}

export default GoogleMapContainer
