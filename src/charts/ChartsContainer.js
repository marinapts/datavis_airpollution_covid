import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Chart from './Chart'
import { readableDate } from '../util'


export default class ChartsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDayFound: false
    }
  }

  sumCasesOverCountries = (data, column) => {
    let allCases = []
    for (let point in data) {
      allCases.push(point[column])
    }
    return allCases.reduce((a, b) => a+b, 0)
  }

  formatDates = (dates) => {
    return dates.map(date => {
      const [month, day, year] = date.split('/')
      const dayMonth = `${month}/${day}`
      return readableDate(dayMonth)
    })
  }

  render() {
    const { covidData, covidDataForSelectedDay, selectedDay, airPollutionData } = this.props
    const formattedDays = this.formatDates(Object.keys(covidData))
    let airPollutionAvg = []

    for (let day in covidData) {
      if (day !== selectedDay) {
        const dailyAirPollution = airPollutionData[day]
        if (dailyAirPollution) {
          const allQualityLevels = dailyAirPollution.map(p => p.AirQualityLevel)
          const sum = allQualityLevels.reduce((a, b) => a+b, 0)
          airPollutionAvg.push({day, avg: sum/(dailyAirPollution.length)})
        }
      } else {
        break
      }
    }


    return (
      <div className="chart-container">
        <Chart data={covidDataForSelectedDay} type="horizontalBar" title="Confirmed Covid-19 Cases per Country" />
        <Chart data={airPollutionAvg} type="cumulative" title="Average N02 Level" xLabels={formattedDays} />
      </div>
    )
  }
}

ChartsContainer.propTypes = {
  covidData: PropTypes.object, // data for all days
  selectedDay: PropTypes.string,  // selected day to use for filtering out
  covidDataForSelectedDay: PropTypes.object,
  airPollutionData: PropTypes.object
}
