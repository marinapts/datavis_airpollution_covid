import React, { Component } from 'react'
import GoogleMapContainer from './mapContainer/GoogleMapContainer'
import { csv } from 'd3'

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
      <div className="App">
        <GoogleMapContainer airPollutionData={airPollutionData} />
      </div>
    )
  }
}
