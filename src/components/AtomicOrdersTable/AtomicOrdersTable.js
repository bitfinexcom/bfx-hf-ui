import React from 'react'
import AtomicOrdersTableColumns from './AtomicOrdersTable.columns'

import { propTypes, defaultProps } from './AtomicOrdersTable.props'
import Table from '../../ui/Table'
import './style.css'

export default class AtomicOrdersTable extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      exID, filtredAtomicOrders: orders, cancelOrder, authToken, gaCancelOrder,
    } = this.props

    return (
      <Table
        data={orders}
        columns={AtomicOrdersTableColumns(exID, authToken, cancelOrder, gaCancelOrder)}
        onRowClick={this.onRowClick}
        defaultSortBy='mts'
        defaultSortDirection='ASC'
      />
    )
  }
}
