import React from 'react'

import { AutoSizer } from 'react-virtualized'
import BFXChart from 'bfx-hf-chart'
import Results from '../Results'

import StrategyTradesTable from '../../StrategyTradesTable'

export default (opts, results, backtestData, backtestOptions) => {
  const { trades = [] } = results
  const { indicators } = opts
  const { candles = [] } = backtestData
  const { tf } = backtestOptions

  // convert candles to array for the chart
  const candleArr = Object.values(candles).map(c => (
    [
      c.mts,
      c.open,
      c.close,
      c.high,
      c.low,
      c.volume,
    ]
  ))

  return (
    <div className='hfui-backtester__candlechart'>
      <Results
        results={results}
        execRunning={false}
      />
      {candles.length && (
      <AutoSizer disableHeight style={{ height: 400 }}>
        {({ width, height = 400 }) => (
          <BFXChart
            indicators={indicators}
            candles={candleArr}
            trades={trades}
            width={width}
            height={height}
            isSyncing={false}
            candleLoadingThreshold={3} // we always get 1 candle when sub'ing
            bgColor='#102331'
            config={{
              AXIS_COLOR: '#444',
              AXIS_TICK_COLOR: '#00000000',
            }}
            candleWidth={tf}
            disableToolbar
            disableIndicatorSettings
            showMarketLabel={false}
          />
        )}
      </AutoSizer>
      )}
      <StrategyTradesTable
        label='Trades'
        trades={trades}
        onTradeClick={() => {}}
      />
    </div>
  )
}
