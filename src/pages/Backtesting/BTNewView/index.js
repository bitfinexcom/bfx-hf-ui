import React from 'react'

import BTNewSidebar from '../../../components/BTNewSidebar'
import BTNewContent from '../../../components/BTNewContent'

export default class BTNewView extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      indicators: {},
    }

    this.onIndicatorUpdate = this.onIndicatorUpdate.bind(this)
  }

  onIndicatorUpdate (key, indicator) {
    this.setState(state => ({
      indicators: {
        ...state.indicators,
        [key]: indicator
      }
    }))
  }

  render () {
    const { symbol, range, tf } = this.props
    const { indicators } = this.state

    return [
      <BTNewSidebar
        indicators={indicators}
        onIndicatorUpdate={this.onIndicatorUpdate}
      />
    ,
      <BTNewContent
        symbol={symbol}
        range={range}
        tf={tf}
      />
    ]
  }
}
