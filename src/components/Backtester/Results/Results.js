import React from 'react'
import PropTypes from 'prop-types'

import { preparePrice } from 'bfx-api-node-util'
import ResultRow from './ResultRow'
import ResultHeader from './ResultHeader'

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
  render() {
    const { results } = this.props
    console.log(results)
    const {
      nCandles, nTrades, nGains, nLosses, nStrategyTrades, nOpens, pl, pf,
      maxPL, minPL, fees, vol, stdDeviation, avgPL,
    } = results
    const hasTrades = !!vol

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
            {hasTrades
              && (
                <>
                  <ResultRow label='Trades' value={nStrategyTrades} />
                  <ResultRow label='Positions' value={nOpens} />
                  <ResultRow label='Gains' value={nGains} />
                  <ResultRow label='Losses' value={nLosses} />
                </>
              )}
          </ul>
        </div>

        <div key='results-right' className='hfui-strategyeditor__results-section'>
          <ul>
            <ResultRow label='Fees' value={resultNumber(preparePrice(fees), '$')} />
            <ResultRow label='Profit/Loss' value={resultNumber(preparePrice(pl), '$')} />
            {hasTrades
              && (
                <>
                  <ResultRow label='Profit Factor' value={resultNumber(pf, '', 2, false)} />
                  <ResultRow label='Volume' value={resultNumber(vol, '$')} />
                  <ResultRow label='Largest Gain' value={resultNumber(preparePrice(maxPL), '$')} />
                  <ResultRow label='Largest Loss' value={resultNumber(preparePrice(minPL), '$')} />
                </>
              )}
          </ul>
        </div>
      </div>
    )
  }
}

Results.propTypes = {
  results: PropTypes.shape({
    nCandles: PropTypes.number,
    nTrades: PropTypes.number,
    nGains: PropTypes.number,
    nLosses: PropTypes.number,
    nStrategyTrades: PropTypes.number,
    nOpens: PropTypes.number,
    pl: PropTypes.number,
    pf: PropTypes.number,
    maxPL: PropTypes.number,
    minPL: PropTypes.number,
    fees: PropTypes.number,
    vol: PropTypes.number,
    stdDeviation: PropTypes.number,
    avgPL: PropTypes.number,
  }),
}

Results.defaultProps = {
  results: {
    nCandles: 0,
    nTrades: 0,
    nGains: 0,
    nLosses: 0,
    nStrategyTrades: 0,
    nOpens: 0,
    pl: 0,
    pf: 0,
    maxPL: 0,
    minPL: 0,
    fees: 0,
    vol: 0,
    stdDeviation: 0,
    avgPL: 0,
  },
}
