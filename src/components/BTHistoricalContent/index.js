import React from 'react'
import Chart from '../Chart'
import BacktestTrades from '../BacktestTrades'

export default class BTHistoricalContent extends React.PureComponent {
  render () {
    return <p>nope</p>
    /*
    return (
      <div className='hfui__content'>
        <Chart
          candles={candleData}
          trades={trades}
          focusTrade={selectedTrade}
          dataMTS={dataMTS}
          indicators={indicators}
        />

        <BacktestTrades
          trades={trades}
          onSelect={this.onSelectTrade}
        />
      </div>
    )
    */
  }
}
