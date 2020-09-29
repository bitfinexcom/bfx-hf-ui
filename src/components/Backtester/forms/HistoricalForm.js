import React from 'react'

import Button from '../../../ui/Button'
import Dropdown from '../../../ui/Dropdown'
import TimeFrameDropdown from '../../TimeFrameDropdown'
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
    })
  }

  defaultFormState(formState) {
    const { allMarkets, exId } = this.props
    return {
      startDate: new Date() - ONE_DAY,
      endDate: new Date(Date.now() - (ONE_MIN * 15)),
      selectedTimeFrame: '15m',
      selectedMarket: allMarkets[exId][0],
      ...formState,
    }
  }

  render() {
    const {
      updateExecutionType,
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
      selectedTimeFrame,
    } = this.defaultFormState(formState)

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
                setFormState(() => ({ selectedMarket: sel }))
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
              onChange={tf => {
                setFormState(() => ({ selectedTimeFrame: tf }))
              }}
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
