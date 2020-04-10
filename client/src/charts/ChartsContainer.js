import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Chart from './Chart'

export default class ChartsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      covidDataForDay: {}  // object containing data for each country
    }
  }

  componentDidMount() {
    this.setDataForSelectedDay()
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedDay !== prevProps.selectedDay) {
      this.setDataForSelectedDay()
    }
  }

  setDataForSelectedDay = () => {
    const { covidData, selectedDay } = this.props
    const covidDataForDay = covidData[selectedDay]
    this.setState({ covidDataForDay })
  }

  render() {
    const { covidDataForDay } = this.state
    return (
      <div className="chart-container">
        <Chart data={covidDataForDay} type="line" />
      </div>
    )
  }
}

ChartsContainer.propTypes = {
  covidData: PropTypes.object, // data for all days
  selectedDay: PropTypes.string  // selected day to use for filtering out
}
