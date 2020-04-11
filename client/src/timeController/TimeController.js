import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { SliderRail, Handle, Track, Tick } from './TimeComponents'

import './time-controller.scss'

export default class TimeController extends Component {
  constructor() {
    super();

    this.state = {
      dates: [],
      ticks: [],
      min: 0,
      max: 0,
      updated: 0,
      dayIndex: -1
    };
  }

  componentDidMount() {
    this.renderDates()
  }

  renderDates = () => {
    let { covidData, airPollutionData } = this.props
    covidData = Object.keys(this.props.covidData)

    const dates = covidData.map(d => {
      let [month, day] = d.split('/')
      return `${month}/${day}`
    })

    const ticks = Object.entries(airPollutionData).filter(entry => (entry[1]['Updated'] === 'true') ? true : false)
                                                  .map(entry => entry[0])
    const ticksIndices = ticks.map(t => covidData.indexOf(t) >= 0 && covidData.indexOf(t))
                              .filter(idx => idx !== false)

    this.setState({ dates, ticks: ticksIndices }, () => {
      this.updateDay([0])  // select 1st day by default
    })
  }

  updateDay = dayIdx => {
    dayIdx = dayIdx[0]
    // This function is called even if the day hasn't changed,
    // so this if statement is necessary to avoid multiple renderings
    if (dayIdx !== this.state.dayIndex) {
      const date = this.state.dates[dayIdx];
      const readable = this.readableDate(date);

      this.setState({ updated: readable, dayIndex: dayIdx }, () => {
        const selectedDay = `${date}/20`
        this.props.setSelectedDay(selectedDay)
      });
    }
  };

  /**
   * Turn date into a readable format. E.g. 2/21 becomes 21 February
   * @param  {string} date
   * @return {string}
   */
  readableDate = date => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const [month, day] = date.split("/");
    return `${day} ${months[parseInt(month) - 1]}`;
  };

  formatTickLabel = tick => {
    const date = this.state.dates[tick];
    return this.readableDate(date);
  }

  render() {
    const { min, max, updated, dates, ticks } = this.state

    return (
      <div className="slider-container">
        <div className="day-selected">
          <b>Selected day: </b> {updated}
        </div>
        {dates.length &&
          <div>
            <Slider
              mode={1}
              step={1}
              domain={[0, dates.length-1]}
              onUpdate={this.updateDay}
              values={[0]}
            >
              <Rail>
                {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
              </Rail>
              <Handles>
                {({ handles, getHandleProps }) => (
                  <div>
                    {handles.map(handle => (
                      <Handle
                        key={handle.id}
                        handle={handle}
                        domain={[+min, +max]}
                        getHandleProps={getHandleProps}
                      />
                    ))}
                  </div>
                )}
              </Handles>
              <Tracks right={false}>
                {({ tracks, getTrackProps }) => (
                  <div>
                    {tracks.map(({ id, source, target }) => (
                      <Track
                        key={id}
                        source={source}
                        target={target}
                        getTrackProps={getTrackProps}
                      />
                    ))}
                  </div>
                )}
              </Tracks>
              <Ticks values={ticks}>
                {({ ticks }) => (
                  <div>
                    {ticks.map(tick => (
                      <Tick
                        key={tick.id}
                        tick={tick}
                        count={ticks.length}
                        format={this.formatTickLabel}
                      />
                    ))}
                  </div>
                )}
              </Ticks>
            </Slider>
          </div>
        }
      </div>
    );
  }
}

TimeController.propTypes = {
  covidData: PropTypes.object, // data for all days
  airPollutionData: PropTypes.array, // air pollution data for all countries
  setSelectedDay: PropTypes.func  // function to update the selected day on the parent
}
