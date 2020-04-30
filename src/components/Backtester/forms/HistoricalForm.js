import React from 'react'

import Button from '../../../ui/Button'
import Dropdown from '../../../ui/Dropdown'
import MarketSelect from '../../MarketSelect'
import ExchangeInfoBarItem from '../../ExchangeInfoBar/ExchangeInfoBarItem'
import { propTypes, defaultProps } from './forms.props'

import DateInput from '../../OrderForm/FieldComponents/input.date'

const markets = [
  {
    uiID: 'tBTCUSD',
    base: 'BTC',
    quote: 'USD',
  },
  {
    uiID: 'tEHTUSD',
    base: 'ETH',
    quote: 'USD',
  },
  {
    uiID: 'tXRPUSD',
    base: 'XRP',
    quote: 'USD',
  },
]

export default class HistoricalForm extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    selectedMarket: markets[0],
  }

  executeBacktest = () => {
    const { backtestStrategy } = this.props
    const { startDate, endDate, selectedMarket } = this.state
    backtestStrategy({
      activeExchange: 'bitfinex',
      activeMarket: selectedMarket.uiID,
      startDate,
      endDate,
    })
  }

  render() {
    const {
      updateExecutionType, executionTypes, executionType,
    } = this.props
    const {
      startDate, endDate, selectedMarket,
    } = this.state

    return (
      <div className='hfui-backtester__executionform'>
        <div className='hfui-backtester_row'>
          <div className='input-label hfui-backtester__flex_start'>
            <div>
              <Dropdown
                value={executionType.type}
                onChange={updateExecutionType}
                options={executionTypes.map(et => ({
                  label: et.type,
                  value: et.type,
                }))}
              />
              <p className='hfui-orderform__input-label'>Execution type</p>
            </div>
          </div>
          <div className='hfui-backtester__flex_start'>
            <ExchangeInfoBarItem
              label='Market'
              value={(
                <MarketSelect
                  markets={markets}
                  value={selectedMarket}
                  onChange={v => this.setState({ selectedMarket: v })}
                />
              )}
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
              def={{ label: 'Start Date' }}
              value={endDate}
            />
          </div>
          <div>
            <Button
              onClick={this.executeBacktest}
              className='hfui-backtester__flex_start'
              // disabled={false}
              label='Start'
              green
            />
          </div>
        </div>
      </div>
    )
  }
}
