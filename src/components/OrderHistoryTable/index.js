import React from 'react'

import Table from '../../ui/Table'
import Panel from '../../ui/Panel'
import OrderHistoryTableColumns from './OrderHistoryTable.columns'

export default class OrderHistoryTable extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onRowClick = this.onRowClick.bind(this)
  }

  onRowClick ({ index } = {}) {
    const { onSelect, orders } = this.props
    onSelect(orders[index])
  }

  render () {
    const { orders, onRemove } = this.props

    return (
      <Panel
        label='ORDER HISTORY'
        onRemove={onRemove}
      >
        <Table
          data={orders}
          columns={OrderHistoryTableColumns}
          onRowClick={this.onRowClick}
          defaultSortBy='mts'
          defaultSortDirection='ASC'
        />
      </Panel>
    )
  }
}
