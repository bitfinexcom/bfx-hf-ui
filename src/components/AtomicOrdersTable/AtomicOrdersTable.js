import React from 'react'
import AtomicOrdersTableColumns from './AtomicOrdersTable.columns'

import Table from '../../ui/Table'

import './style.css'

// TODO: Extract props
export default class OrdersTable extends React.PureComponent {
  render() {
    const { exID, orders, cancelOrder } = this.props

    return (
      <Table
        data={orders}
        columns={AtomicOrdersTableColumns(exID, cancelOrder)}
        onRowClick={this.onRowClick}
        defaultSortBy='mts'
        defaultSortDirection='ASC'
      />
    )
  }
}