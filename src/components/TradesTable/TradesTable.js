import React from 'react'
import _take from 'lodash/take'
import _isEqual from 'lodash/isEqual'

import Table from '../../ui/Table'
import TradesTableColumns from './TradesTable.columns'
import { propTypes, defaultProps } from './TradesTable.props'
import './style.css'


const DISPLAY_LIMIT = 50

export default class TradesTable extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  shouldComponentUpdate(nextProps) {
    let flag = false
    const { trades } = this.props
    if (trades.length !== nextProps.trades.length) {
      return true
    }
    trades.forEach((trade, index) => {
      if (_isEqual(trade, nextProps.trades[index])) {
        flag = true
      }
    })

    return flag
  }
  render() {
    const { trades } = this.props
    const limitedTrades = _take(trades, DISPLAY_LIMIT)

    return (
      <Table
        data={limitedTrades}
        columns={TradesTableColumns}
        onRowClick={this.onRowClick}
        defaultSortBy='mts'
        defaultSortDirection='DESC'
      />
    )
  }
}
