import React, { Component } from 'react'

import Chart from './Chart'

export default class ChartsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      airPollutionData: []
    }
  }


  render() {
    return (
      <div className="chart-container">
        <Chart type="line" />
        <Chart type="bar" />
      </div>
    )
  }
}
