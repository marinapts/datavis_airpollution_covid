import React, { Component } from 'react'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { SliderRail, Handle, Track, Tick } from './TimeComponents'

import './time-controller.scss'

export default class TimeController extends Component {
  constructor() {
    super();

    this.state = {
      dates: [],
      min: 0,
      max: 0,
      updated: 0
    };
  }

  componentDidMount() {
    this.renderDates()
  }

  renderDates = () => {
    const data = Object.keys(this.props.data)
    const dates = data.map(d => {
      let [month, day] = d.split('/')
      return `${month}/${day}`
    })

    this.setState({ dates }, () => {
      this.onDateUpdate([0])  // select 1st day by default
    })
  }

  onDateUpdate = dateIndex => {
    const date = this.state.dates[dateIndex[0]];
    const readable = this.readableDate(date);
    this.setState({ updated: readable }, () => {
      const selectedDay = `${date}/20`
      this.props.setSelectedDay(selectedDay)
    });
  };

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
    const { min, max, updated, dates } = this.state;
    // const values = [...Array(dates.length).keys()];
    // @TODO: Change ticks
    const ticks = [0, 20, 50];

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
              onUpdate={this.onDateUpdate}
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
