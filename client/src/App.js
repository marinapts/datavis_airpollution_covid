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
      selectedDay: '',
      covidDataForSelectedDay: []
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
    this.setState({ selectedDay, covidDataForSelectedDay: this.state.covidData[selectedDay] })
  }

  render() {
    const { airPollutionData, covidData, selectedDay, covidDataForSelectedDay } = this.state

    return (
      <div className="app">
        <div className="data-area">
          <div className="map">
            <GoogleMapContainer airPollutionData={airPollutionData} />
          </div>
          <div className="charts">
            <ChartsContainer covidData={covidDataForSelectedDay} selectedDay={selectedDay} />
          </div>
        </div>
        <div className="time-controller">
          <TimeController
            covidData={covidData}
            airPollutionData={airPollutionData}
            setSelectedDay={this.setSelectedDay}
          />
        </div>
      </div>
    )
  }
}
