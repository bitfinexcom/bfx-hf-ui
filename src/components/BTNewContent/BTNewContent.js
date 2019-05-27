import React from 'react'
import _find from 'lodash/find'
import _isFinite from 'lodash/isFinite'
import _isObject from 'lodash/isObject'
import { NonIdealState } from '@blueprintjs/core'

import { candleWidth } from 'bfx-hf-util'
import HFI from 'bfx-hf-indicators'

import Chart from '../Chart'
import StrategyEditor from '../StrategyEditor'
import ID from '../../util/id'

import './style.css'

const indicatorClassById = _id => (
  Object.values(HFI).find(i => i.id === _id)
)

export default class BTNewContent extends React.PureComponent {
  state = {}

  static getDerivedStateFromProps (nextProps, prevState) {
    const { dataKey, candles, indicators } = nextProps

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

    // Note that new data is only computed for clean/saved indicators
    indicators
      .filter(i => !i.dirty && i.created)
      .forEach((i = {}) => {
        const { id, key } = i
        const args = i.args.map(a => +a.value)
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

    // Copy over any previous data for dirty indicators
    indicators
      .filter(i => i.dirty && i.created)
      .forEach(i => {
        indicatorData[i.key] = prevState.indicatorData[i.key]
      })

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

    return {
      indicatorData,
      candles: candleArr,
      dataKey: ID(),
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.handleSync()
    }, 5000)
  }

  componentDidUpdate (prevProps) {
    const { symbol, range, tf } = prevProps

    if (
      (symbol !== this.props.symbol) ||
      (tf !== this.props.tf) ||
      (range[0] !== this.props.range[0]) ||
      (range[1] !== this.props.range[1])
    ) {
      this.handleSync()
    }
  }

  handleSync () {
    const { candles, symbol, range, tf, syncCandles } = this.props
    const [ from, to ] = range

    // Incomplete/invalid range
    if (from === null || to === null || (+from) > (+to)) {
      return
    }

    const nCandles = Math.floor(((+to) - (+from)) / candleWidth(tf))

    if (nCandles !== candles.length) {
      console.warn(`have incomplete candles: ${nCandles} !== ${candles.length} (${symbol}, ${tf})`)

      syncCandles(symbol, tf, range)
    }
  }

  renderChart () {
    const { indicatorData, candles, dataKey } = this.state
    const { range, indicators } = this.props
    const [ from, to ] = range

    if (from === null || to === null) {
      return (
        <NonIdealState
          title='No Range Selected'
          icon='series-derived'
        />
      )
    } else if (candles.length === 0) {
      return (
        <NonIdealState
          title='Loading Candles...'
        />
      )
    }

    return (
      <Chart
        candles={candles}
        trades={[]}
        orders={[]}
        focusTrade={null}
        dataKey={dataKey}
        indicators={indicators}
        indicatorData={indicatorData}
      />
    )
  }

  renderEditor () {
    const { candles } = this.state
    const { strategy, onSaveStrategyMethod, onEvalStrategy } = this.props

    if (candles.length === 0) {
      return null
    }

    return (
      <StrategyEditor
        strategy={strategy}
        onEval={onEvalStrategy}
        onSaveMethod={onSaveStrategyMethod}
      />
    )
  }

  render () {
    return (
      <div className='bt_new_content'>
        {this.renderChart()}
        {this.renderEditor()}
      </div>
    )
  }
}
