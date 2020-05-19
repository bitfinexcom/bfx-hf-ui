import React from 'react'

import { preparePrice } from 'bfx-api-node-util'
import ResultRow from './ResultRow'
import ResultHeader from './ResultHeader'
import { propTypes, defaultProps } from './Results.props'


import './style.css'

const resultNumber = (value, prefix = '', maxDecimals = 2, color = true) => {
  let val = Number(Number(value).toFixed(maxDecimals))
  if (Number.isNaN(val)) {
    val = 0
  }
  const valueString = val.toLocaleString()
  if (Number(value) < 0) {
    return <span style={{ color: color ? 'red' : '' }}>{prefix + valueString}</span>
  }
  return <span style={{ color: color ? 'green' : '' }}>{prefix + valueString}</span>
}

export default class Results extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { results } = this.props
    const {
      nCandles, nTrades, nGains, nLosses, nStrategyTrades, nOpens, pl, pf,
      maxPL, minPL, fees, vol, stdDeviation, avgPL,
    } = results || {}

    return (
      <div className='hfui-strategyeditor__results-wrapper'>
        <div className='hfui-strategyeditor__results-header'>
          <ResultHeader label='Total P/L' value={resultNumber(preparePrice(pl), '$')} />
          <ResultHeader label='Avg PL' value={resultNumber(avgPL, '$', 2)} />
          <ResultHeader label='Profit Factor' value={resultNumber(pf, '', 2, false)} />
          <ResultHeader label='Volatility' value={resultNumber(stdDeviation, '', 2, false)} />
        </div>
        <div key='results-left' className='hfui-strategyeditor__results-section'>
          <ul>
            <ResultRow label='Backtest Candles' value={nCandles} />
            <ResultRow label='Backtest Trades' value={nTrades} />
            <ResultRow label='Trades' value={nStrategyTrades} />
            <ResultRow label='Positions' value={nOpens} />
            <ResultRow label='Gains' value={nGains} />
            <ResultRow label='Losses' value={nLosses} />
          </ul>
        </div>

        <div key='results-right' className='hfui-strategyeditor__results-section'>
          <ul>
            <ResultRow label='Fees' value={resultNumber(preparePrice(fees), '$')} />
            <ResultRow label='Profit/Loss' value={resultNumber(preparePrice(pl), '$')} />
            <ResultRow label='Profit Factor' value={resultNumber(pf, '', 2, false)} />
            <ResultRow label='Volume' value={resultNumber(vol, '$')} />
            <ResultRow label='Largest Gain' value={resultNumber(preparePrice(maxPL), '$')} />
            <ResultRow label='Largest Loss' value={resultNumber(preparePrice(minPL), '$')} />
          </ul>
        </div>
      </div>
    )
  }
}
