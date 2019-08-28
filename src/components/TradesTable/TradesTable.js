import React from 'react'
import _take from 'lodash/take'

import Table from '../../ui/Table'
import TradesTableColumns from './TradesTable.columns'
import './style.css'

const DISPLAY_LIMIT = 50

// TODO: Extract props
export default class TradesTable extends React.PureComponent {
  render () {
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