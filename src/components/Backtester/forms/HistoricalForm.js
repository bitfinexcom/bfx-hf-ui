import React from 'react'

import Button from '../../../ui/Button'
import Dropdown from '../../../ui/Dropdown'
import TimeFrameDropdown from '../../TimeFrameDropdown'
import { propTypes, defaultProps } from './forms.props'

import DateInput from '../../OrderForm/FieldComponents/input.date'

const markets = [
  // TODO: get markets from 'availableMarkets'
  {
    uiID: 'tBTCUSD',
    base: 'BTC',
    quote: 'USD',
  },
  {
    uiID: 'tETHUSD',
    base: 'ETH',
    quote: 'USD',
  },
  {
    uiID: 'tXRPUSD',
    base: 'XRP',
    quote: 'USD',
  },
]

// TODO: use global exchangeId or allow user to change
const exId = 'bitfinex'

export default class HistoricalForm extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    selectedMarket: markets[0],
    startDate: new Date(),
    endDate: new Date(),
    selectedTimeFrame: '1m',
  }

  executeBacktest = () => {
    const {
      backtestStrategy,
      updateError,
    } = this.props
    const {
      startDate,
      endDate,
      selectedMarket,
      selectedTimeFrame,
    } = this.state
    if (!selectedTimeFrame) {
      return updateError('ERROR: Invalid timeFrame')
    }
    return backtestStrategy({
      activeExchange: exId,
      activeMarket: selectedMarket.uiID,
      tf: selectedTimeFrame,
      startDate,
      endDate,
    })
  }

  render() {
    const {
      updateExecutionType, executionTypes, executionType, disabled = false,
    } = this.props
    const {
      startDate, endDate, selectedMarket, selectedTimeFrame,
    } = this.state

    return (
      <div className='hfui-backtester__executionform'>
        <div className='hfui-backtester_row'>
          <div className='hfui-backtester__flex_start'>
            <Dropdown
              value={executionType.type}
              onChange={updateExecutionType}
              options={executionTypes.map(et => ({
                label: et.type,
                value: et.type,
              }))}
            />
          </div>
          <div className='hfui-backtester__flex_start'>
            <Dropdown
              value={selectedMarket.uiID}
              onChange={(selection) => {
                const sel = markets.find(m => m.uiID === selection)
                this.setState({ selectedMarket: sel })
              }}
              options={markets.map(m => ({
                label: m.uiID,
                value: m.uiID,
              }))}
            />
          </div>
          <div className='hfui-backtester__flex_start' style={{ marginRight: -15 }}>
            <TimeFrameDropdown
              exID={exId}
              tf={selectedTimeFrame}
              onChange={tf => this.setState({ selectedTimeFrame: tf })}
            />
          </div>
        </div>
        <div className='hfui-backtester_row'>
          <div className='hfui-backtester_dateInput hfui-backtester__flex_start'>
            <DateInput
              onChange={val => this.setState({ startDate: val })}
              def={{ label: 'Start Date' }}
              value={startDate}
            />
          </div>
          <div className='hfui-backtester_dateInput hfui-backtester__flex_start'>
            <DateInput
              onChange={val => this.setState({ endDate: val })}
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
