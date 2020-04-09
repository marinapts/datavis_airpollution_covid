import React, { Component } from 'react'
import { csv } from 'd3'

import GoogleMapContainer from './mapContainer/GoogleMapContainer'
import ChartsContainer from './charts/ChartsContainer'
import TimerController from './timeController/TimerController'

import './app.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      airPollutionData: []
    }
  }

  componentDidMount() {
    this.getAirPollutionData()
  }

  getAirPollutionData = async () => {
    const data = await csv('data/air_pollution_it.csv')
    // const data = await csv('data/test.csv')
    const airPollutionData = data.map(row => ({
      lat: parseFloat(row.LatitudeOfMeasurementStation),
      lng: parseFloat(row.LongitudeOfMeasurementStation),
      // quality: parseFloat(row.AirQualityLevel)
    }))
    console.log('airPollutionData', airPollutionData)
    this.setState({ airPollutionData })
  }

  render() {
    const { airPollutionData } = this.state
    return (
      <div className="app">
        <div className="map">
          <GoogleMapContainer airPollutionData={airPollutionData} />
        </div>
        <div className="charts">
          <ChartsContainer />
        </div>
        <TimerController />
      </div>
    )
  }
}
