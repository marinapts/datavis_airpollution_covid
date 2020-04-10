import React, { Component } from 'react'
import { LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import Card from '@material-ui/core/Card'
import { CardContent, Typography } from '@material-ui/core'

import './chart.scss'

export default class ChartsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      airPollutionData: [],
      width: 500,
      height: 200
    }
  }


  render() {
    const { width, height } = this.state
    const { type } = this.props
    const lineData = [
      {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 200, pv: 3000, amt: 1500},
      {name: 'Page C', uv: 800, pv: 2100, amt: 2500},
    ];
    const barData = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    ];

    return (
      <Card className="card">
        <CardContent className="card-content">
          <Typography variant="h5" component="h2" className="card-title">
            Active Cases
          </Typography>
          <Typography className="card-subtitle">adjective</Typography>
          {type === 'line' ?
            <LineChart width={width} height={height} data={lineData}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart> :

            <BarChart width={width} height={height} data={barData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          }
        </CardContent>
      </Card>
    )
  }
}
