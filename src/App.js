import React, { Component } from 'react'

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
    const { covidData, airPollutionData } = this.state

    this.setState({
      selectedDay,
      covidDataForSelectedDay: covidData[selectedDay],
      airPollutionDataForSelectedDay: airPollutionData[selectedDay]
    })
  }

  render() {
    let { airPollutionData, covidData, selectedDay, covidDataForSelectedDay, airPollutionDataForSelectedDay } = this.state

    return (
      <div className="app">
        <div className="data-area">
          <div className="map">
            <GoogleMapContainer airPollutionData={airPollutionDataForSelectedDay} />
          </div>
          <div className="charts">
            <ChartsContainer
              covidData={covidData}
              covidDataForSelectedDay={covidDataForSelectedDay}
              selectedDay={selectedDay}
              airPollutionData={airPollutionData}
            />
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
