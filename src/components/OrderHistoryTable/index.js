import React from 'react'

import Table from '../../ui/Table'
import Panel from '../../ui/Panel'
import OrderHistoryTableColumns from './OrderHistoryTable.columns'
import { propTypes, defaultProps } from './OrderHistoryTable.props'

export default class OrderHistoryTable extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.onRowClick = this.onRowClick.bind(this)
  }

  onRowClick({ index } = {}) {
    const { onSelect, orders } = this.props
    onSelect(orders[index])
  }

  render() {
    const { orders, onRemove, dark } = this.props

    return (
      <Panel
        label='ORDER HISTORY'
        onRemove={onRemove}
        dark={dark}
        darkHeader={dark}
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
