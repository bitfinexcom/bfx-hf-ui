import React from 'react'

import Button from '../../../ui/Button'
import Dropdown from '../../../ui/Dropdown'
import MarketSelect from '../../MarketSelect'
import TimeFrameDropdown from '../../TimeFrameDropdown'
import { propTypes, defaultProps } from './forms.props'

import DateInput from '../../OrderForm/FieldComponents/input.date'
import Checkbox from '../../../ui/Checkbox/Checkbox'

const ONE_MIN = 1000 * 60
const ONE_HOUR = ONE_MIN * 60
const ONE_DAY = ONE_HOUR * 24
const MAX_DATE = new Date()

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
      candles,
      trades,
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
      trades: false,
      candles: true,
      checkboxErr: false,
      ...formState,
    }
  }
  validateForm() {
    const { setFormState, formState } = this.props
    const { trades, candles } = this.defaultFormState(formState)
    if (!trades && !candles) {
      setFormState(() => ({ emptyBtErr: true }))
    } else {
      setFormState(() => ({ emptyBtErr: false }))
    }
  }
  toggleCandles(val) {
    const { setFormState } = this.props
    setFormState(() => ({ candles: val }), () => {
      this.validateForm()
    })
  }
  toggleTrades(val) {
    const { setFormState } = this.props
    setFormState(() => ({ trades: val }), () => {
      this.validateForm()
    })
  }

  favoriteSelect(pair, isAddition) {
    const { savePairs, authToken, favoritePairs = [] } = this.props
    if (isAddition) {
      savePairs([...favoritePairs, pair], authToken)
    } else {
      const filtredPairs = favoritePairs.filter(p => p !== pair)
      savePairs(filtredPairs, authToken)
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
      favoritePairs,
    } = this.props
    const {
      startDate,
      endDate,
      selectedMarket,
      selectedTimeFrame,
      candles,
      trades,
      emptyBtErr,
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
            <MarketSelect
              value={selectedMarket}
              favoritePairs={favoritePairs}
              onFavoriteSelect={(pair, isFilled) => this.favoriteSelect(pair, isFilled)}
              onChange={(selection) => {
                const sel = allMarkets[exId].find(m => m.uiID === selection.uiID)
                setFormState(() => ({ selectedMarket: sel }))
              }}
              markets={allMarkets[exId]}
              renderWithFavorites
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
        <div className='hfui-backtester_row'>
          <div className='hfui-backtester_dateInput hfui-backtester__flex_start'>
            <Checkbox
              label='Use candles'
              value={candles}
              onChange={val => this.toggleCandles(val)}
            />
          </div>
          <div className='hfui-backtester_dateInput hfui-backtester__flex_start'>
            <Checkbox
              label='Use trades'
              value={trades}
              onChange={val => this.toggleTrades(val)}
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
