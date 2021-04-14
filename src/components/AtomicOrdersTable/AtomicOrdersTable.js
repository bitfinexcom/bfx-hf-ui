import React from 'react'
import PropTypes from 'prop-types'
import { Orders } from 'ufx-ui'

import './style.css'

const convertOrders = (orders) => orders.map(order => ({
  ...order,
  pair: order.symbol,
  placed: order.created,
  baseCcy: order.symbol.split(':')[0],
}))

const AtomicOrdersTable = ({
  exID, filteredAtomicOrders: orders, cancelOrder, authToken,
}) => (
  <Orders
    orders={convertOrders(orders)}
    className='hfui-orderstable__wrapper'
    cancelOrder={(_, order) => cancelOrder(exID, authToken, order)}
  />
)

AtomicOrdersTable.propTypes = {
  exID: PropTypes.string.isRequired,
  authToken: PropTypes.string.isRequired,
  filteredAtomicOrders: PropTypes.arrayOf(PropTypes.object),
  cancelOrder: PropTypes.func.isRequired,
}

AtomicOrdersTable.defaultProps = {
  filteredAtomicOrders: [],
}

export default React.memo(AtomicOrdersTable)
