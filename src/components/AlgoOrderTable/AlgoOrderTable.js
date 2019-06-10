import React from 'react'

import Panel from '../../ui/Panel'
import Table from '../../ui/Table'
import AlgoOrderTableColumns from './AlgoOrderTable.columns'
import { propTypes, defaultProps } from './AlgoOrderTable.props'

const ALGO_NAMES = {
  'bfx-accumulate_distribute': 'Accumulate/Distribute',
  'bfx-ping_pong': 'Ping/Pong',
  'bfx-iceberg': 'Iceberg',
  'bfx-twap': 'TWAP'
}
const algoOrders = [
      [42, 'bfx-ping_pong', true, null, +(new Date(Date.now() - (4 * 60 * 60 * 1000)))],
      [42, 'bfx-iceberg', true, null, +(new Date(Date.now() - (4 * 60 * 60 * 1000)))],
      [42, 'bfx-ping_pong', true, null, +(new Date(Date.now() - (4 * 60 * 60 * 1000)))],
    ]
export default class AlgoOrderTable extends React.PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.onRowClick = this.onRowClick.bind(this)
  }

  onRowClick ({ index } = {}) {
    const { onSelect, algoOrders } = this.props
    onSelect(algoOrders[index])
  }

  render () {
    const { algoOrders, orders } = this.props
    const orderObjects = algoOrders.map(ao => ({
      gid: ao[0],
      name: ALGO_NAMES[ao[1]],
      mts: ao[4],
      status: ao[2] ? 'ACTIVE' : 'STOPPED',
      orderCount: orders.filter(o => o[1] === +ao[0]).length,
      symbol: (orders.find(o => o[1] === +ao[0]) || {})[3] || ''
    }))

    return (
      <Panel label='Algo Orders' contentClassName='table__wrapper'>
        <Table
          data={orderObjects}
          columns={AlgoOrderTableColumns}
          onRowClick={this.onRowClick}
          defaultSortBy='mts'
          defaultSortDirection='ASC'
        />
      </Panel>
    )
  }
}
