import React, { Component } from 'react'

import GoogleMapContainer from './mapContainer/GoogleMapContainer'
import ChartsContainer from './charts/ChartsContainer'
import TimeController from './timeController/TimeController'
import covid from './data/covid'
// import airPollution from './data/air_pollution_data'
import airPollution from './data/air_pollution_new'

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
      // airPollutionDataForSelectedDay: airPollutionData[selectedDay].filter(row => row.Country === 'italy')
      airPollutionDataForSelectedDay: airPollutionData[selectedDay]
    })
  }

  render() {
    let { airPollutionData, covidData, selectedDay, covidDataForSelectedDay, airPollutionDataForSelectedDay } = this.state
    // console.log('all', airPollutionDataForSelectedDay)
    // console.log('airPollutionDataForSelectedDay', airPollutionDataForSelectedDay.filter(i => i.Longitude < -50))
    if (airPollutionDataForSelectedDay) {
      // airPollutionDataForSelectedDay = airPollutionDataForSelectedDay.filter(row => row.Country === 'iceland')
      console.log('airPollutionDataForSelectedDay', airPollutionDataForSelectedDay.filter(row => row.Country === 'iceland'))
    }

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
