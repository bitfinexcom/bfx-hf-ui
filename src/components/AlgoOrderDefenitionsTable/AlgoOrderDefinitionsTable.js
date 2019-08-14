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

  shouldComponentUpdate(nextProps) {
    const newOrders = nextProps.orders
    const { orders } = this.props
    return JSON.stringify(orders) !== JSON.stringify(newOrders)
  }

  render() {
    const { orders, stopOrder, runOrder } = this.props
    const orderObjects = orders.reverse().map((ao) => {
      const isActive = !!ao[2]
      let status = (
        <button
          type='button'
          className='hfui__stop-order-btn '
          onClick={() => runOrder(ao[0])}
        >
          Activate
        </button>
      )
      if (isActive) {
        status = (
          <button
            type='button'
            className='hfui__stop-order-btn '
            onClick={() => stopOrder(ao[0])}
          >
            Stop
          </button>
        )
      }
      return {
        gid: ao[0],
        name: ALGO_NAMES[ao[1]],
        mts: ao[0],
        amount: ao[3].args.amount,
        orderType: ao[3].args.orderType,
        symbol: ao[3].args.symbol,
        price: ao[3].args.price,
        status,
      }
    })
    const noOrdersDialogue = (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <p style={{ marginTop: 70 }}>
          No algo orders have been created yet,
        </p>
        <p>Head to bitfinex.com and create one.</p>
      </div>
    )
    return (
      <Panel
        label={orders.length > 0 ? 'Orders' : ''}
        contentClassName='table__wrapper'
        style={{ height: '100%' }}
      >
        {
          (orders.length > 0) && (
            <Table
              data={orderObjects}
              columns={AlgoOrderDefinitionsTableColumns}
              maxWidth={850}
              defaultSortDirection='ASC'
            />
          )
        }
        {
          (orders.length <= 0) && (
            noOrdersDialogue
          )
        }
      </Panel>
    )
  }
}
