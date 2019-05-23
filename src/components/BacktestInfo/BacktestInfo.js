import React from 'react'
import _last from 'lodash/last'
import _isEmpty from 'lodash/isEmpty'
import _min from 'lodash/min'
import _max from 'lodash/max'

import percent from '../../util/to_percent'
import maxProfit from '../../util/calculate/max_profit'
import tradeVolume from '../../util/calculate/trade_volume'

import Panel from '../../ui/Panel'
import BacktestInfoRow from './BacktestInfoRow'
import './style.css'

import prepareAmount from '../../util/precision/prepare_amount'

export default class BacktestInfo extends React.PureComponent {
  render() {
    const { bt, candles = [], trades = [] } = this.props

    if (_isEmpty(candles)) {
      return null
    }

    const firstCandle = candles[0]
    const lastCandle = _last(candles)

    const opens = trades.filter(t => t.pl === 0)
    const closed = trades.filter(t => t.pl !== 0)

    const shorts = closed.filter(t => t.amount < 0)
    const longs = closed.filter(t => t.amount > 0)

    const losses = closed.filter(t => t.pl < 0)
    const gains = closed.filter(t => t.pl > 0)

    const gainsShorts = shorts.filter(t => t.pl > 0).length / shorts.length
    const gainsLongs = longs.filter(t => t.pl > 0).length / longs.length

    const maxGain = _max(gains.map(c => c.pl))
    const maxLoss = _min(losses.map(c => c.pl))

    const totalGain = gains.reduce((prev, curr) => prev + curr.pl, 0)
    const totalLoss = losses.reduce((prev, curr) => prev + curr.pl, 0)
    const profitFactor = (totalGain / Math.abs(totalLoss)).toFixed(2)
    const totalFees = trades.reduce((prev, curr) => prev + curr.fee, 0)

    const pl = trades.reduce((prev, curr) => prev + curr.pl, 0)

    // calculate Draw Down
    const peakValue = maxProfit(trades)
    const drawdown = percent((pl - peakValue) / peakValue)

    const volume = tradeVolume(trades).toFixed(2)

    return (
      <Panel label='Backtest Info' contentClassName='btinfo'>
        <ul>
          <BacktestInfoRow
            label='ID'
            value={bt.bt_id}
          />

          <BacktestInfoRow
            label='Period Start'
            value={new Date(firstCandle.c.mts).toLocaleString()}
          />

          <BacktestInfoRow
            label='Period End'
            value={new Date(lastCandle.c.mts).toLocaleString()}
          />
          <BacktestInfoRow label='Candles' value={candles.length} />
          <BacktestInfoRow label='Strategy Trades' value={trades.length} />

          <BacktestInfoRow className='btinfo-row--no-border' />

          <BacktestInfoRow label='Opens' value={opens.length} />
          <BacktestInfoRow label='Gains' value={gains.length} />
          <BacktestInfoRow label='Losses' value={losses.length} />

          <BacktestInfoRow className='btinfo-row--no-border' />

          <BacktestInfoRow label='Longs ( % won )' value={`${longs.length} ( ${percent(gainsLongs)} % )`} />
          <BacktestInfoRow label='Shorts ( % won )' value={`${shorts.length} ( ${percent(gainsShorts)} % )`} />

          <BacktestInfoRow className='btinfo-row--no-border' />

          <BacktestInfoRow label='Max Gain' value={prepareAmount(maxGain)} />
          <BacktestInfoRow label='Max Loss' value={prepareAmount(maxLoss)} />
          <BacktestInfoRow label='Total Gain' value={prepareAmount(totalGain)} />
          <BacktestInfoRow label='Total Loss' value={prepareAmount(totalLoss)} />
          <BacktestInfoRow label='Total Fees' value={prepareAmount(totalFees)} />
          <BacktestInfoRow label='Drawdown' value={`${drawdown} %`} />
          <BacktestInfoRow label='Profit Factor' value={profitFactor} />
          <BacktestInfoRow label='Voume' value={`${volume} USD`} />

          <BacktestInfoRow className='btinfo-row--no-border' />

          <BacktestInfoRow label='P/L' value={prepareAmount(pl)} />
        </ul>
      </Panel>
    )
  }
}
