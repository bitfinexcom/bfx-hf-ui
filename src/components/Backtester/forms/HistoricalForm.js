import React from 'react'

import Button from '../../../ui/Button'
import Dropdown from '../../../ui/Dropdown'
import { propTypes, defaultProps } from './forms.props'

import DateInput from '../../OrderForm/FieldComponents/input.date'

const ONE_MIN = 1000 * 60
const ONE_HOUR = ONE_MIN * 60
const ONE_DAY = ONE_HOUR * 24
const MAX_DATE = new Date()

export default class HistoricalForm extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  state = {
    trades: true,
    candles: false,
  }
  executeBacktest = () => {
    const {
      backtestStrategy,
      updateError,
      exId,
      formState,
    } = this.props
    const { trades, candles } = this.state
    const {
      startDate,
      endDate,
      selectedMarket,
      selectedTimeFrame,
    } = this.defaultFormState(formState)

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
      candles,
      trades,
    })
  }

  defaultFormState(formState) {
    const { allMarkets, exId } = this.props
    return {
      startDate: new Date() - ONE_DAY,
      endDate: new Date(Date.now() - (ONE_MIN * 15)),
      selectedTimeFrame: '15m',
      selectedMarket: allMarkets[exId][0],
      checkboxErr: false,
      ...formState,
    }
  }

  render() {
    const allOptions = ['Trades', 'Candles', 'Trades & Candles']
    const {
      disabled = false,
      allMarkets,
      exId,
      setFormState,
      formState,
    } = this.props
    const {
      startDate,
      endDate,
      selectedMarket,
      emptyBtErr,
      selectedOption = allOptions[0],
    } = this.defaultFormState(formState)
    return (
      <div className='hfui-backtester__executionform'>
        <div className='hfui-backtester_row'>
          <div className='hfui-backtester__flex_start'>
            <Dropdown
              value={selectedMarket.uiID}
              onChange={(selection) => {
                const sel = allMarkets[exId].find(m => m.uiID === selection)
                setFormState(() => ({ selectedMarket: sel }))
              }}
              options={allMarkets[exId].map(m => ({
                label: m.uiID,
                value: m.uiID,
              }))}
            />
          </div>
          <div className='hfui-backtester__flex_start' style={{ marginRight: -15 }}>
            <Dropdown
              value={selectedOption}
              onChange={(selection) => {
                const sel = allOptions.find(m => m === selection)
                if (sel === 'Trades') {
                  this.setState(() => ({
                    trades: true,
                    candles: false,
                  }))
                } else if (sel === 'Candles') {
                  this.setState(() => ({
                    candles: true,
                    trades: false,
                  }))
                } else {
                  this.setState(() => ({
                    trades: true,
                    candles: true,
                  }))
                }
                return setFormState(() => ({ selectedOption: sel }))
              }}
              options={allOptions.map(o => ({
                label: o,
                value: o,
              }))}
            />
          </div>
        </div>
        <div className='hfui-backtester_row'>
          <div className='hfui-backtester_dateInput hfui-backtester__flex_start'>
            <DateInput
              onChange={val => setFormState(() => ({ startDate: val }))}
              def={{ label: 'Start Date' }}
              value={startDate}
              maxDate={MAX_DATE}
            />
          </div>
          <div className='hfui-backtester_dateInput hfui-backtester__flex_start'>
            <DateInput
              onChange={val => setFormState(() => ({ endDate: val }))}
              def={{ label: 'End Date' }}
              value={endDate}
              maxDate={MAX_DATE}
            />
          </div>
          <div>
            <Button
              onClick={this.executeBacktest}
              style={{ marginLeft: 5 }}
              className='hfui-backtester__flex_start hfui-backtester__start-button'
              disabled={disabled || emptyBtErr}
              label='Start'
              green
            />
          </div>
        </div>
        {emptyBtErr && (
        <div className='hfui-backtester_row'>
          <div className='hfui-backtester__flex_start'>
            <div className='hfui-backtester__check-error' key='of-error'>
              <p>At least one checkbox should be selected.</p>
            </div>
          </div>
        </div>
        )}
      </div>
    )
  }
}
