import React from 'react'

import Panel from '../../ui/Panel'
import Table from '../../ui/Table'
import AlgoOrderDefinitionsTableColumns from './AlgoOrderDefinitionsTable.columns'
import { propTypes, defaultProps } from './AlgoOrderDefinitionsTable.props'

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



  shouldComponentUpdate(nextProps) {
    const newAlgoOrders = nextProps.algoOrders
    const newOrders = nextProps.orders
    const { algoOrders, orders } = this.props
    if (orders.length !== newOrders.length) {
      return true
    }
    if (newAlgoOrders.length !== algoOrders.length) {
      return true
    }

    const isSame = newAlgoOrders.every((row, indexRow) => row.every((value, indexValue) => value === algoOrders[indexRow][indexValue]))

    return !isSame
  }

  render () {
    const { orders } = this.props
    const orderObjects = orders.map(ao => (
      {gid: ao[0],
      name: ALGO_NAMES[ao[1]],
      mts: ao[0],
      amount: ao[3].args.amount,
      orderType: ao[3].args.orderType,
      ccy: ao[3].args.symbol,
      price: ao[3].args.price,
      status: ao[2] ? 'ACTIVE' : 'STOPPED',
    }))
    return (
      <Panel label='Orders' contentClassName='table__wrapper'>
        <Table
          data={orderObjects}
          columns={AlgoOrderDefinitionsTableColumns}
          maxWidth={850}
          defaultSortDirection='ASC'
        />
      </Panel>
    )
  }
}
