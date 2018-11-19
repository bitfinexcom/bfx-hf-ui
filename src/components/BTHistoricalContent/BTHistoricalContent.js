import React from 'react'
import _isEmpty from 'lodash/isEmpty'
import _isFinite from 'lodash/isFinite'
import _find from 'lodash/find'
import _isObject from 'lodash/isObject'
import HFI from 'bfx-hf-indicators'

import Chart from '../Chart'
import PLChart from '../PLChart'
import BacktestTrades from '../BacktestTrades'
import ID from '../../util/id'

import './style.css'

const indicatorClassById = _id => (
  Object.values(HFI).find(i => i.id === _id)
)

export default class BTHistoricalContent extends React.PureComponent {
  state = {}

  constructor (props) {
    super(props)

    this.onPLChartClick = this.onPLChartClick.bind(this)
    this.onSelectTrade = this.onSelectTrade.bind(this)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { dataKey, bt = {}, candles = [] } = nextProps
    const { indicators = [] } = bt

    if (prevState && dataKey === prevState.dataKey) {
      return null
    }

    const candleArr = Object
      .keys(candles)
      .sort((a, b) => a - b)
      .map(mts => ({
        date: new Date(+mts),
        volume: candles[mts].vol,
        ...candles[mts]
      }))

    const indicatorData = {}
    const indicatorModels = []

    if (!_isEmpty(indicators)) {
      indicators
        .forEach((i = {}) => {
          const { args, id, key } = i
          const IClass = indicatorClassById(id)

          // Requires that all args are finite
          // TODO: Refactor if other arg types are ever required
          if (IClass && !_find(args, a => !_isFinite(a))) {
            indicatorData[key] = {}
            indicatorModels.push({
              i: new IClass(args),
              key,
            })
          }
        })

      /*
      // Copy over any previous data for dirty indicators
      indicators
        .filter(i => i.dirty && i.created)
        .forEach(i => {
          indicatorData[i.key] = prevState.indicatorData[i.key]
        })
      */

      candleArr.forEach((c, i) => {
        indicatorModels.forEach(m => {
          const dt = m.i.getDataType()
          const dk = m.i.getDataKey()
          let v = 0

          // NOTE: Only candles are supported
          if (dt === '*' || dt === 'candle') {
            m.i.add(dk === '*' ? c : c[dk])
            v = m.i.v()
          }

          indicatorData[m.key][c.mts] = _isFinite(v) || _isObject(v)
            ? v
            : 0
        })
      })
    }

    return {
      indicatorData,
      candles: candleArr,
      dataKey: ID(),
    }
  }

  onPLChartClick (item) {
    this.setState(() => ({
      focusMTS: +item.date,
      dataKey: ID()
    }))
  }

  onSelectTrade (trade) {
    this.setState(() => ({
      focusMTS: trade.mts,
      dataKey: ID()
    }))
  }

  componentDidUpdate (prevProps) {
    const { bt } = this.props

    if (bt !== prevProps.bt) {
      this.handleSync()
    }
  }

  handleSync () {
    const { bt, syncCandles } = this.props
    const { symbol, tf, from, to } = bt

    syncCandles(symbol, tf, [new Date(from), new Date(to)])
  }

  render () {
    const { bt } = this.props
    const { indicatorData, candles, focusMTS, dataKey } = this.state

    if (!bt) {
      return <p>No Backtest Selected</p>
    }

    const { trades } = bt
    const indicators = bt.indicators.map(i => ({
      ...indicatorClassById(i.id),
      key: i.key,
    }))

    const plTrades = []

    trades.forEach((trade, i) => {
      const plTrade = {
        date: new Date(+trade.mts),
        ...trade,
      }

      plTrade.pl = i === 0
        ? trade.pl
        : plTrades[i - 1].pl + trade.pl

      plTrades.push(plTrade)
    })

    return (
      <div className='hfui__content'>
        <div className='historicalstats__container'>
          <PLChart
            trades={plTrades}
            dataMTS={dataKey}
            onClick={this.onPLChartClick}
          />
        </div>

        <Chart
          candles={candles}
          trades={trades}
          focusMTS={focusMTS}
          dataMTS={dataKey}
          indicators={indicators}
          indicatorData={indicatorData}
        />

        <BacktestTrades
          trades={trades}
          onSelect={this.onSelectTrade}
        />
      </div>
    )
  }
}
