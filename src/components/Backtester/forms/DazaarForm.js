import React from 'react'
import Button from '../../../ui/Button'
import Dropdown from '../../../ui/Dropdown'
import { propTypes, defaultProps } from './forms.props'

import DateInput from '../../OrderForm/FieldComponents/input.date'

const ONE_MIN = 1000 * 60
const ONE_HOUR = ONE_MIN * 60
const ONE_DAY = ONE_HOUR * 24
const markets = {
  tBTCUSD: {
    candles: '76ef1d766eee63ff473e33e1f231c3b65cf1042b1a353c027b48bdbeba00b969',
    trades: '03a3af100709be37800a189e64d51fe63cd62d6660ce9bf3e6fea3d6670c1310',
  },
  tEOSUSD: {
    candles: 'cdf7da8866184b1033690a2e1bc9b80b0290bc2f93a522b8151694698681e126',
    trades: 'ac34b6eda8d9553524c07da9ae6746d02ea77d605f4ba5381b5449e0c510e01d',
  },
  tETHUSD: {
    candles: 'ff2d4456b2f873f91e7d84c898c5f99e0b8c797aa2339a9f73a5aecc21df3553',
    trades: 'a99f1a009874a41138346046db7824e9cef3dde250be48446539e1db09c5ca73',
  },
  tLEOUSD: {
    candles: '5abc850236631b319e4c231b42ba6eadf3cf85fceea81d12b72d2496ae46d30c',
    trades: '5912723049b6bb8741bfd0a801205530c3ce8d29ef4ab440bd84f00c58c72d53',
  },
  tLTCUSD: {
    candles: 'f2d20ed0614fb315fbb50be3f46bd6767848e555a44a2160a8e219d0ea74497b',
    trades: '47499e99f41234c6abad3e2151a7a98ce2cb945e4327e69c828605cd673bf40e',
  },
  tXRPUSD: {
    candles: 'b33c9a499ddcade9237dbf6266215ee69ffb04972047240882402586e0deec27',
    trades: 'd9160a5604a88af022d7dc5429c7aa3cf0d0831fcc215078b896d8e489aa4a0e',
  },
}

export default class HistoricalForm extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  state = {
    trades: true,
    candles: false,
  }
  executeBacktest = () => {
    const ids = []
    const {
      dsExecuteDazaar,
      updateError,
      exId,
      formState,
    } = this.props
    const {
      startDate,
      endDate,
      selectedTimeFrame,
      selectedPair,
    } = this.defaultFormState(formState)
    const { trades, candles } = this.state
    if (trades) {
      ids.push([markets[selectedPair].trades, 'trades'])
    }
    if (candles) {
      ids.push([markets[selectedPair].candles, 'candles'])
    }
    if (!selectedTimeFrame) {
      return updateError('ERROR: Invalid timeFrame')
    }
    if (endDate <= startDate) {
      return updateError('ERROR: Invalid time period')
    }
    return dsExecuteDazaar({
      activeExchange: exId,
      activeMarket: selectedPair,
      tf: selectedTimeFrame,
      startDate,
      endDate,
      opts: {
        store: true,
        terms: window.localStorage.getItem('tos'),
      },
      ids,
    })
  }
  symbolToLabel(symbol) { //eslint-disable-line
    if (symbol.includes(':')) {
      let [base, quote] = symbol.split(':') //eslint-disable-line
      if (base.includes('t')) {
        base = base.substring(1, base.length)
      }
      return `${base}/${quote}`
    }
    return `${symbol.substring(1, 4)}/${symbol.substring(4)}`
  }
  defaultFormState(formState) {
    const { allMarkets, exId } = this.props
    return {
      startDate: new Date() - ONE_DAY,
      endDate: new Date(Date.now() - (ONE_MIN * 15)),
      selectedTimeFrame: '15m',
      selectedMarket: allMarkets[exId][0],
      checkboxErr: false,
      selectedPair: 'tBTCUSD',
      ...formState,
    }
  }

  render() {
    const allOptions = ['Trades', 'Candles', 'Trades & Candles']
    const {
      disabled = false,
      setFormState,
      formState,
    } = this.props
    const {
      startDate,
      endDate,
      emptyBtErr,
      selectedOption = allOptions[0],
      selectedPair,
    } = this.defaultFormState(formState)
    return (
      <div className='hfui-backtester__executionform'>
        <div className='hfui-backtester_row'>
          <div className='hfui-backtester__flex_start'>
            <Dropdown
              value={selectedPair}
              onChange={(selection) => {
                const sel = Object.keys(markets).find(m => m === selection)
                setFormState(() => ({ selectedPair: sel }))
              }}
              options={Object.keys(markets).map(m => ({
                label: this.symbolToLabel(m),
                value: m,
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
                return setFormState(() => ({
                  selectedOption: sel,
                }))
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
