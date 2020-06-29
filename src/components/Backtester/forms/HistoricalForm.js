import React from 'react'

import Button from '../../../ui/Button'
import Dropdown from '../../../ui/Dropdown'
import TimeFrameDropdown from '../../TimeFrameDropdown'
import { propTypes, defaultProps } from './forms.props'

import DateInput from '../../OrderForm/FieldComponents/input.date'

export default class HistoricalForm extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    startDate: new Date(),
    endDate: new Date(),
    selectedTimeFrame: '1m',
  }

  executeBacktest = () => {
    const {
      backtestStrategy,
      updateError,
      exId,
      allMarkets,
    } = this.props
    const {
      startDate,
      endDate,
      selectedMarket = allMarkets[exId][0],
      selectedTimeFrame,
    } = this.state

    if (!selectedTimeFrame) {
      return updateError('ERROR: Invalid timeFrame')
    }

    if (endDate <= startDate) {
      return updateError('ERROR: Invalid time period')
    }

    return backtestStrategy({
      activeExchange: exId,
      activeMarket: selectedMarket.wsID,
      tf: selectedTimeFrame,
      startDate,
      endDate,
    })
  }

  render() {
    const {
      updateExecutionType,
      disabled = false,
      allMarkets,
      exId,
    } = this.props
    const {
      startDate,
      endDate,
      selectedMarket = allMarkets[exId][0],
      selectedTimeFrame,
    } = this.state

    return (
      <div className='hfui-backtester__executionform'>
        <div className='hfui-backtester_row'>
          <div className='hfui-backtester__flex_start'>
            <Dropdown
              value='Historical'
              disabled
              onChange={updateExecutionType}
              options={[{
                label: 'Historical',
                value: 'Historical',
              }]}
            />
          </div>
          <div className='hfui-backtester__flex_start'>
            <Dropdown
              value={selectedMarket.uiID}
              onChange={(selection) => {
                const sel = allMarkets[exId].find(m => m.uiID === selection)
                this.setState(() => ({ selectedMarket: sel }))
              }}
              options={allMarkets[exId].map(m => ({
                label: m.uiID,
                value: m.uiID,
              }))}
            />
          </div>
          <div className='hfui-backtester__flex_start' style={{ marginRight: -15 }}>
            <TimeFrameDropdown
              exID={exId}
              tf={selectedTimeFrame}
              onChange={tf => this.setState(() => ({ selectedTimeFrame: tf }))}
            />
          </div>
        </div>
        <div className='hfui-backtester_row'>
          <div className='hfui-backtester_dateInput hfui-backtester__flex_start'>
            <DateInput
              onChange={val => this.setState(() => ({ startDate: val }))}
              def={{ label: 'Start Date' }}
              value={startDate}
            />
          </div>
          <div className='hfui-backtester_dateInput hfui-backtester__flex_start'>
            <DateInput
              onChange={val => this.setState(() => ({ endDate: val }))}
              def={{ label: 'End Date' }}
              value={endDate}
            />
          </div>
          <div>
            <Button
              onClick={this.executeBacktest}
              style={{ marginLeft: 5 }}
              className='hfui-backtester__flex_start hfui-backtester__start-button'
              disabled={disabled}
              label='Start'
              green
            />
          </div>
        </div>
      </div>
    )
  }
}
