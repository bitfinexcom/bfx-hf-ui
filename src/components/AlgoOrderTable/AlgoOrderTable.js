import React from 'react'

import Panel from '../../ui/Panel'
import Table from '../../ui/Table'
import AlgoOrderTableColumns from './AlgoOrderTable.columns'
import { propTypes, defaultProps } from './AlgoOrderTable.props'

const ALGO_NAMES = {
  'bfx-accumulate_distribute': 'Accumulate/Distribute',
  'bfx-ping_pong': 'Ping/Pong',
  'bfx-iceberg': 'Iceberg',
  'bfx-twap': 'TWAP',
}

export default class AlgoOrderTable extends React.Component {
  static propTypes = propTypes

  static defaultProps = defaultProps

  state = {
    editorOpened: false,
  }

  componentDidMount() {
    const { getTableData, algoOrders } = this.props
    // we can change this latter, if we need fetch data on each comonent mount
    const firstElementInRow = algoOrders[0][0]
    if (firstElementInRow === undefined) {
      getTableData()
    }
  }

  shouldComponentUpdate(nextProps) {
    const newAlgoOrders = nextProps.algoOrders
    const { algoOrders } = this.props

    if (newAlgoOrders.length !== algoOrders.length) {
      return true
    }

    const isSame = nextProps.algoOrders.every((row, indexRow) => row.every((value, indexValue) => value === algoOrders[indexRow][indexValue]))

    return !isSame
  }

  onRowClick({ index } = {}) {
    const {
      onSelect, algoOrders,
    } = this.props
    onSelect(algoOrders[index])
  }

  render() {
    const { algoOrders, orders } = this.props
    const orderObjects = algoOrders.map(ao => ({
      gid: ao[0],
      name: ALGO_NAMES[ao[1]],
      mts: ao[4],
      status: ao[2] ? 'ACTIVE' : 'STOPPED',
      orderCount: orders.filter(o => o[1] === +ao[0]).length,
      symbol: (orders.find(o => o[1] === +ao[0]) || {})[3] || '',
    }))

    return (
      <Panel label='Algo Orders' contentClassName='table__wrapper'>
        <Table
          data={orderObjects}
          columns={AlgoOrderTableColumns}
          onRowClick={e => this.onRowClick(e)}
          defaultSortBy='mts'
          defaultSortDirection='ASC'
        />
      </Panel>
    )
  }
}
