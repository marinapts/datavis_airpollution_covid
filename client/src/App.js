import React, { Component } from 'react'
import { csv } from 'd3'

import GoogleMapContainer from './mapContainer/GoogleMapContainer'
import ChartsContainer from './charts/ChartsContainer'
import TimeController from './timeController/TimeController'
import covid from './data/covid'
import airPollution from './data/air_pollution_data'

import './app.scss'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      airPollutionData: airPollution,
      covidData: covid,
      selectedDay: '',
      covidDataForSelectedDay: [],
      airPollutionDataForSelectedDay: [],
    }
  }

  setSelectedDay = selectedDay => {
    console.log('selectedDay', selectedDay)
    const { covidData, airPollutionData } = this.state
    let airPollutionDataForSelectedDay = this.state.airPollutionDataForSelectedDay

    // Check if air pollution data is available for the selected day
    if (airPollutionData[selectedDay]) {
      airPollutionDataForSelectedDay = airPollutionData[selectedDay]['Data']
    }

    this.setState({ selectedDay, covidDataForSelectedDay: covidData[selectedDay], airPollutionDataForSelectedDay })
  }

  render() {
    const { airPollutionData, covidData, selectedDay, covidDataForSelectedDay, airPollutionDataForSelectedDay } = this.state

    return (
      <div className="app">
        <div className="data-area">
          <div className="map">
            <GoogleMapContainer airPollutionData={airPollutionDataForSelectedDay} />
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
