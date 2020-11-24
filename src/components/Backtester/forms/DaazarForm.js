import React from 'react'

import Button from '../../../ui/Button'
import Dropdown from '../../../ui/Dropdown'
import { propTypes, defaultProps } from './forms.props'

import DateInput from '../../OrderForm/FieldComponents/input.date'

const ONE_MIN = 1000 * 60
const ONE_HOUR = ONE_MIN * 60
const ONE_DAY = ONE_HOUR * 24

export default class HistoricalForm extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  executeBacktest = () => {
    const {
      backtestStrategy,
      updateError,
      exId,
      formState,
    } = this.props
    const {
      startDate,
      endDate,
      selectedMarket,
      selectedTimeFrame,
      isTrades = true,
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
      candles: !isTrades,
      trades: isTrades,
    })
  }

  defaultFormState(formState) {
    const { allMarkets, exId } = this.props
    return {
      startDate: new Date() - ONE_DAY,
      endDate: new Date(Date.now() - (ONE_MIN * 15)),
      selectedTimeFrame: '15m',
      selectedMarket: allMarkets[exId][0],
      trades: true,
      candles: false,
      checkboxErr: false,
      ...formState,
    }
  }

  render() {
    const allOptions = ['Trades', 'Candles']
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
                  return setFormState(() => ({ isTrades: true, selectedOption: sel }))
                }
                return setFormState(() => ({ isTrades: false, selectedOption: sel }))
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
            />
          </div>
          <div className='hfui-backtester_dateInput hfui-backtester__flex_start'>
            <DateInput
              onChange={val => setFormState(() => ({ endDate: val }))}
              def={{ label: 'End Date' }}
              value={endDate}
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
