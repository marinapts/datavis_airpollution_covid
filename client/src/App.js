import React, { Component } from 'react'
import { csv } from 'd3'

import GoogleMapContainer from './mapContainer/GoogleMapContainer'
import ChartsContainer from './charts/ChartsContainer'
import TimeController from './timeController/TimeController'
import covidData from './data/covid'

import './app.scss'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      airPollutionData: [],
      covidData: []
    }
  }

  componentDidMount() {
    this.getAirPollutionData()
    this.getCovidData()
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

  getCovidData = () => this.setState({ covidData })

  render() {
    const { airPollutionData } = this.state
    return (
      <div className="app">
        <div className="data-area">
          <GoogleMapContainer className="map" airPollutionData={airPollutionData} />
          <ChartsContainer className="charts" data={covidData} />
        </div>
        <div className="time-controller">
          <TimeController data={covidData} />
        </div>
      </div>
    )
  }
}
