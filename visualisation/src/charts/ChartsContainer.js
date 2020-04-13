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
    for (let country in data) {
      allCases.push(data[country][column])
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
    const { covidData, covidDataForSelectedDay, selectedDay } = this.props
    const formattedDays = this.formatDates(Object.keys(covidData))
    let cumulativeData = []

    for (let day in covidData) {
      if (day !== selectedDay) {
        const sumOverCountries = this.sumCasesOverCountries(covidData[day], 'confirmed')
        cumulativeData.push({day, sum: sumOverCountries})
      } else {
        break
      }
    }


    return (
      <div className="chart-container">
        <Chart data={covidDataForSelectedDay} type="horizontalBar" title="Confirmed Cases per European Country" />
        <Chart data={covidDataForSelectedDay} type="cumulative" title="Cumulative Cases in Europe"
               xLabels={formattedDays} values={cumulativeData}
        />
      </div>
    )
  }
}

ChartsContainer.propTypes = {
  covidData: PropTypes.object, // data for all days
  selectedDay: PropTypes.string  // selected day to use for filtering out
}
