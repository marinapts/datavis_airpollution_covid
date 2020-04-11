import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography } from '@material-ui/core'
import { Bar, defaults } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import './chart.scss'

// Disable animating charts by default.
// defaults.global.animation = false

export default class Chart extends Component {
  render() {
    const { data, type } = this.props
    let labels = ['']
    let dataPoints = []

    if (data) {
      labels = Object.keys(data)
      dataPoints = Object.values(data).map(d => d.confirmed)
    }

    const chartData = {
        labels,
        datasets: [{
          label: "My First dataset",
          backgroundColor: 'white',
          borderColor: 'white',
          data: dataPoints
        }]
    }

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    return (
      <Card className="card">
        <CardContent className="card-content">
          <Typography variant="h5" component="h2" className="card-title">
            Active Cases
          </Typography>
          <Typography className="card-subtitle">subtitle</Typography>
          {chartData.labels.length &&
            <Bar
              data={chartData}
              options={options}
              plugins={[ChartDataLabels]}
            />
          }

        </CardContent>
      </Card>
    )
  }
}

Chart.propTypes = {
  data: PropTypes.object, // data for a selected day
  type: PropTypes.string  // chart type
}
