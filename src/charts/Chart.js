import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from '@material-ui/core'
import { HorizontalBar, Line } from 'react-chartjs-2'
// import ChartDataLabels from 'chartjs-plugin-datalabels'

import './chart.scss'

// Disable animating charts by default.
// defaults.global.animation = false

export default class Chart extends Component {
  render() {
    const { data, type, title, xLabels } = this.props

    return (
      <Card className="card">
        <div className="card-title">{title}</div>
        {type === 'horizontalBar' && <BarChart data={data} />}
        {type === 'cumulative' && <LineChart data={data} xLabels={xLabels} />}
      </Card>
    )
  }
}

Chart.propTypes = {
  data: PropTypes.object, // data for a selected day
  type: PropTypes.string,  // chart type horizontalBar|cumulative
  title: PropTypes.string,  // title of the chart
  xLabels: PropTypes.array,  // custom labels for the x axis
}


class BarChart extends Component {
  sortCountries = (data, sortColumn) => {
    let sortable = []
    for (let country in data) {
      sortable.push([country, data[country][sortColumn]])
    }
    return sortable.sort((a, b) => b[1] - a[1])
  }

  render() {
    const data = this.props.data
    // Line chart
    let labels = ['']
    let dataPoints = []

    if (data) {
      const sortedCountries = this.sortCountries(data, 'confirmed')
      labels = sortedCountries.map(el => el[0])
      dataPoints = sortedCountries.map(el => el[1])
    }

    /**
     * Chart Options
     */
    const chartData = {
        labels,
        datasets: [{
          backgroundColor: '#35d8d0',
          borderColor: '#35d8d0',
          data: dataPoints,
        }]
    }

    const options = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {fontColor: "lightgrey", stepSize: 1, beginAtZero: true}
        }],
        xAxes: [{
          ticks: {fontColor: "lightgrey", stepSize: 100, beginAtZero: true}
        }]
      },
      legend: {display: false}
    }

    return(
      <HorizontalBar
        data={chartData}
        options={options}
        // plugins={[ChartDataLabels]}
        width={100}
        height={400}
      />
    )
  }
}


class LineChart extends Component {
  render() {
    const { data, xLabels } = this.props

    const lineData = {
      labels: xLabels,
      datasets: [
        {
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#35d8d0',
          borderColor: '#35d8d0',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#35d8d0',
          pointBackgroundColor: '#35d8d0',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#35d8d0',
          pointHoverBorderColor: '#35d8d0',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data.map(v => v.avg.toFixed(2))
        },
      ]
    };

    const options = {
      legend: {display: false},
      scales: {
        yAxes: [{ticks: {fontColor: "lightgrey", fontSize: 13, stepSize: 1, beginAtZero: true}}],
        xAxes: [{ticks: {fontColor: "lightgrey", fontSize: 13}}]
      }
    }


    return(
      <Line data={lineData} options={options} />
    )
  }
}
