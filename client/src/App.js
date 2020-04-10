import React, { Component } from 'react'
import { csv } from 'd3'

import GoogleMapContainer from './mapContainer/GoogleMapContainer'
import ChartsContainer from './charts/ChartsContainer'
import TimeController from './timeController/TimeController'
import covid from './data/covid'

import './app.scss'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      airPollutionData: [],
      covidData: covid,
      selectedDay: ''
    }
  }

  componentDidMount() {
    this.getAirPollutionData()
  }

  getAirPollutionData = async () => {
    const data = await csv('data/air_pollution_it.csv')
    const airPollutionData = data.map(row => ({
      lat: parseFloat(row.LatitudeOfMeasurementStation),
      lng: parseFloat(row.LongitudeOfMeasurementStation),
      // quality: parseFloat(row.AirQualityLevel)
    }))
    this.setState({ airPollutionData })
  }

  setSelectedDay = selectedDay => {
    this.setState({ selectedDay })
  }

  render() {
    const { airPollutionData, covidData, selectedDay } = this.state
    console.log('airPollutionData', airPollutionData)
    console.log('covidData', covidData)

    return (
      <div className="app">
        <div className="data-area">
          <div className="map">
            <GoogleMapContainer airPollutionData={airPollutionData} />
          </div>
          <div className="charts">
            <ChartsContainer covidData={covidData} selectedDay={selectedDay} />
          </div>
        </div>
        <div className="time-controller">
          <TimeController data={covidData} setSelectedDay={this.setSelectedDay} />
        </div>
      </div>
    )
  }
}
