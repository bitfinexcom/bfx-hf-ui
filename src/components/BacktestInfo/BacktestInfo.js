import React from 'react'
import _last from 'lodash/last'
import _isEmpty from 'lodash/isEmpty'
import _min from 'lodash/min'
import _max from 'lodash/max'

import Panel from '../../ui/Panel'
import BacktestInfoRow from './BacktestInfoRow'
import './style.css'

import prepareAmount from '../../util/precision/prepare_amount'

export default class BacktestInfo extends React.PureComponent {
  render () {
    const { candles, trades } = this.props

    if (_isEmpty(candles)) {
      return null
    }

    const firstCandle = candles[0]
    const lastCandle = _last(candles)
    const losses = trades.filter(t => t.trade.pl < 0)
    const gains = trades.filter(t => t.trade.pl > 0)
    const opens = trades.filter(t => t.trade.pl === 0)
    const pl = trades.reduce(((prev, curr) => prev + curr.trade.pl), 0)
    const totalGain = gains.reduce(((prev, curr) => prev + curr.trade.pl), 0)
    const totalLoss = losses.reduce(((prev, curr) => prev + curr.trade.pl), 0)
    const totalFees = trades.reduce(((prev, curr) => prev + curr.trade.fee), 0)
    const maxGain = _max(gains.map(c => c.trade.pl))
    const maxLoss = _min(losses.map(c => c.trade.pl))

    return (
      <Panel label='Backtest Info' contentClassName='btinfo'>
        <ul>
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
          <br />
          <BacktestInfoRow label='Opens' value={opens.length} />
          <BacktestInfoRow label='Gains' value={gains.length} />
          <BacktestInfoRow label='Losses' value={losses.length} />
          <br />
          <BacktestInfoRow label='Max Gain' value={prepareAmount(maxGain)} />
          <BacktestInfoRow label='Max Loss' value={prepareAmount(maxLoss)} />
          <BacktestInfoRow label='Total Gain' value={prepareAmount(totalGain)} />
          <BacktestInfoRow label='Total Loss' value={prepareAmount(totalLoss)} />
          <BacktestInfoRow label='Total Fees' value={prepareAmount(totalFees)} />
          <br />
          <BacktestInfoRow label='P/L' value={prepareAmount(pl)} />
        </ul>
      </Panel>
    )
  }
}
