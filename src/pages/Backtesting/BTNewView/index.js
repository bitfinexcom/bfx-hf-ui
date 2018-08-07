import React from 'react'
import _findIndex from 'lodash/findIndex'
import ColorScheme from 'color-scheme'

import BTNewSidebar from '../../../components/BTNewSidebar'
import BTNewContent from '../../../components/BTNewContent'
import GenStrategy from '../../../util/gen_strategy'
import ID from '../../../util/id'

export default class BTNewView extends React.PureComponent {
  constructor (props) {
    super(props)

    const scheme = new ColorScheme()
    scheme.from_hue(21)
    scheme.scheme('analogic')

    this.state = {
      dataKey: ID(),
      indicators: [],
      strategy: GenStrategy(),
      colors: scheme.colors()
    }

    this.onIndicatorAdded = this.onIndicatorAdded.bind(this)
    this.onIndicatorSaved = this.onIndicatorSaved.bind(this)
    this.onIndicatorUpdated = this.onIndicatorUpdated.bind(this)
    this.onIndicatorDeleted = this.onIndicatorDeleted.bind(this)
    this.onSaveStrategyMethod = this.onSaveStrategyMethod.bind(this)
    this.onEvalStrategy = this.onEvalStrategy.bind(this)
  }

  onSaveStrategyMethod (key, content) {
    this.setState(state => ({
      strategy: {
        ...state.strategy,
        [key]: content
      }
    }))
  }

  onIndicatorAdded (i) {
    this.setState(state => ({
      dataKey: ID(),
      indicators: [
        ...state.indicators,
        i,
      ]
    }))
  }

  onIndicatorSaved (i) { // TODO:
    i.dirty = false
    i.created = true
    this.onIndicatorUpdated(i)
  }

  onIndicatorUpdated (i) {
    this.setState(state => {
      const is = [ ...state.indicators ]
      const n = _findIndex(is, indicator => indicator._id === i._id)

      if (n === -1) {
        console.error('updated unknown indicator: ', i._id)
        return state
      }

      is[n] = i

      return {
        dataKey: ID(),
        indicators: is,
      }
    })
  }

  onIndicatorDeleted (i) {
    this.setState(state => {
      const is = [ ...state.indicators ]
      const n =_findIndex(is, indicator => indicator._id === i._id)

      if (n === -1) {
        console.error('deleted unknown indicator: ', i._id)
        return state
      }

      is.splice(n, 1)

      return {
        dataKey: ID(),
        indicators: is,
      }
    })
  }

  onEvalStrategy () {
    const { strategy, indicators } = this.state
    console.log('req eval')
    console.log({ strategy, indicators })
  }

  render () {
    const { symbol, range, tf } = this.props
    const { dataKey, colors, indicators, strategy } = this.state
    const activeIndicators = indicators.filter(i => (
      i.created && i.enabled
    ))

    return [
      <BTNewSidebar
        key='sidebar'
        indicators={indicators}
        colors={colors}
        onIndicatorAdded={this.onIndicatorAdded}
        onIndicatorSaved={this.onIndicatorSaved}
        onIndicatorUpdated={this.onIndicatorUpdated}
        onIndicatorDeleted={this.onIndicatorDeleted}
      />
    ,
      <div
        className='hfui__content'
        key='content'
      >
        <BTNewContent
          onEvalStrategy={this.onEvalStrategy}
          onSaveStrategyMethod={this.onSaveStrategyMethod}
          indicators={activeIndicators}
          strategy={strategy}
          dataKey={dataKey}
          symbol={symbol}
          range={range}
          tf={tf}
        />
      </div>
    ]
  }
}
