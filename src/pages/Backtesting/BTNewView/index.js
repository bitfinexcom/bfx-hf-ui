import React from 'react'
import _findIndex from 'lodash/findIndex'
import ColorScheme from 'color-scheme'

import BTNewSidebar from '../../../components/BTNewSidebar'
import BTNewContent from '../../../components/BTNewContent'
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
      colors: scheme.colors()
    }

    this.onIndicatorAdded = this.onIndicatorAdded.bind(this)
    this.onIndicatorSaved = this.onIndicatorSaved.bind(this)
    this.onIndicatorUpdated = this.onIndicatorUpdated.bind(this)
    this.onIndicatorDeleted = this.onIndicatorDeleted.bind(this)
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
      const n =_findIndex(is, indicator => indicator._id === i._id)

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

  render () {
    const { symbol, range, tf } = this.props
    const { dataKey, colors, indicators } = this.state
    const activeIndicators = indicators.filter(i => (
      i.created && i.enabled
    ))

    return [
      <BTNewSidebar
        indicators={indicators}
        colors={colors}
        onIndicatorAdded={this.onIndicatorAdded}
        onIndicatorSaved={this.onIndicatorSaved}
        onIndicatorUpdated={this.onIndicatorUpdated}
        onIndicatorDeleted={this.onIndicatorDeleted}
      />
    ,
      <div className='hfui__content'>
        <BTNewContent
          dataKey={dataKey}
          indicators={activeIndicators}
          symbol={symbol}
          range={range}
          tf={tf}
        />
      </div>
    ]
  }
}
