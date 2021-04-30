import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../../ui/Button'
import Dropdown from '../../../ui/Dropdown'
import MarketSelect from '../../MarketSelect'
import TimeFrameDropdown from '../../TimeFrameDropdown'

import Checkbox from '../../../ui/Checkbox/Checkbox'
import DateInput from '../../OrderForm/FieldComponents/input.date'

const ONE_MIN = 1000 * 60
const ONE_HOUR = ONE_MIN * 60
const ONE_DAY = ONE_HOUR * 24
const MAX_DATE = new Date()

export default class HistoricalForm extends React.PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    formState: PropTypes.objectOf(Object),
    markets: PropTypes.array, // eslint-disable-line
    updateError: PropTypes.func.isRequired,
    setFormState: PropTypes.func.isRequired,
    backtestStrategy: PropTypes.func.isRequired,
    updateExecutionType: PropTypes.func.isRequired,
  }
  static defaultProps = {
    formState: {},
    markets: [],
    disabled: false,
  }

  componentDidUpdate(prevProps) {
    const { formState: { candles: prevCandles, trades: prevTrades } } = prevProps
    const { formState: { candles, trades } } = this.props

    if (candles !== prevCandles || trades !== prevTrades) {
      this.validateForm()
    }
  }

  executeBacktest = () => {
    const {
      formState,
      updateError,
      backtestStrategy,
    } = this.props
    const {
      trades,
      endDate,
      candles,
      startDate,
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
      activeMarket: selectedMarket.wsID,
      tf: selectedTimeFrame,
      startDate,
      endDate,
      candles,
      trades,
    })
  }

  defaultFormState = (formState) => {
    const { markets } = this.props

    return {
      startDate: new Date() - ONE_DAY,
      endDate: new Date(Date.now() - (ONE_MIN * 15)),
      selectedTimeFrame: '15m',
      selectedMarket: markets[0],
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
    setFormState(() => ({ candles: val }))
  }
  toggleTrades(val) {
    const { setFormState } = this.props
    setFormState(() => ({ trades: val }))
  }

  render() {
    const {
      disabled,
      formState,
      markets,
      setFormState,
      updateExecutionType,
    } = this.props
    const {
      trades,
      endDate,
      candles,
      startDate,
      emptyBtErr,
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
          <div className='hfui-backtester__flex_start hfui-backtester__market-select'>
            <MarketSelect
              value={selectedMarket}
              onChange={(selection) => {
                const sel = markets.find(m => m.uiID === selection.uiID)
                setFormState(() => ({ selectedMarket: sel }))
              }}
              markets={markets}
              renderWithFavorites
            />
          </div>
          <div className='hfui-backtester__flex_start' style={{ marginRight: -15 }}>
            <TimeFrameDropdown
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
