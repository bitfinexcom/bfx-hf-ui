import React from 'react'

import { preparePrice } from 'bfx-api-node-util'
import ResultRow from './ResultRow'
import { propTypes, defaultProps } from './Results.props'
import './style.css'

export default class Results extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      results, execRunning, currentTick, totalTicks,
    } = this.props
    const {
      nCandles, nTrades, nGains, nLosses, nStrategyTrades, nOpens, pl, pf,
      maxPL, minPL, fees, vol,
    } = results || {}

    const label = execRunning
      ? `Strategy running... (${currentTick}/${totalTicks} ticks)`
      : results
        ? 'Results'
        : 'No Results'

    return (
      <div className='hfui-strategyeditor__results-wrapper'>
        {results ? [
          <p key='header'>{label}</p>,

          <div key='results-left' className='hfui-strategyeditor__results-section'>
            <ul>
              <ResultRow label='Backtest Candles' value={nCandles} />
              <ResultRow label='Backtest Trades' value={nTrades} />
              <ResultRow label='Trades' value={nStrategyTrades} />
              <ResultRow label='Positions' value={nOpens} />
              <ResultRow label='Gains' value={nGains} />
              <ResultRow label='Losses' value={nLosses} />
            </ul>
          </div>,

          <div key='results-right' className='hfui-strategyeditor__results-section'>
            <ul>
              <ResultRow label='Fees' value={`$${preparePrice(fees)}`} />
              <ResultRow label='Profit/Loss' value={`$${preparePrice(pl)}`} />
              <ResultRow label='Profit Factor' value={pf.toFixed(4)} />
              <ResultRow label='Volume' value={`$${vol.toLocaleString()}`} />
              <ResultRow label='Largest Gain' value={`$${preparePrice(maxPL)}`} />
              <ResultRow label='Largest Loss' value={`$${preparePrice(minPL)}`} />
            </ul>
          </div>,
        ] : (
          <p>{label}</p>
        )}
      </div>
    )
  }
}
