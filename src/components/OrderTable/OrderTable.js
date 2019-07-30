import React from 'react'

import Panel from '../../ui/Panel'
import Table from '../../ui/Table'
import OrderTableColumns from './OrderTable.columns'
import { propTypes, defaultProps } from './OrderTable.props'

export default class OrderTable extends React.PureComponent {
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
    const { orders, label } = this.props
    const orderObjects = orders.map(o => ({
      symbol: o[3],
      created: new Date(o[4]).toLocaleString(),
      price: o[16],
      amount: o[7],
      type: o[8],
      status: o[13],
    }))

    return (
      <Panel label={label || 'Orders'} contentClassName='table__wrapper'>
        <Table
          data={orderObjects}
          columns={OrderTableColumns}
          onRowClick={this.onRowClick}
          defaultSortBy='mts'
          defaultSortDirection='ASC'
        />
      </Panel>
    )
  }
}
