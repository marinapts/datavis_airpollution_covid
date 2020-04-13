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
            />
          </div>
        </div>
		<h5 style={{ color: 'white' }}>Low NO2 Level (0ug/m3)</h5>
		  <div style={{marginTop:'-33px',marginLeft:'153px', height: '10px', width: '20%', background: 'linear-gradient(to left,rgba(255, 0, 0, 1),rgba(191, 0, 31, 1),rgba(127, 0, 63, 1),rgba(63, 0, 91, 1),rgba(0, 0, 127, 1),rgba(0, 0, 159, 1),rgba(0, 0, 191, 1),rgba(0, 0, 223, 1),rgba(0, 0, 255, 1),rgba(0, 63, 255, 1),rgba(0, 127, 255, 1),rgba(0, 191, 255, 1),rgba(0, 255, 255, 1),rgba(0, 255, 255, 0))'}}>
		  </div>
		<h5 style={{  marginTop:'-15px', marginLeft:'460px',color: 'white',}}>High NO2 Level (125ug/m3)</h5>
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
