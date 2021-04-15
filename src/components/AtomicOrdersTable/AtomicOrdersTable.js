import React from 'react'
import PropTypes from 'prop-types'
import { Orders } from 'ufx-ui'

import './style.css'
import { ROW_MAPPING } from './AtomicOrdersTable.helpers'

const AtomicOrdersTable = ({
  exID, filteredAtomicOrders: orders, cancelOrder, authToken,
}) => (
  <Orders
    orders={orders}
    className='hfui-orderstable__wrapper'
    cancelOrder={(_, order) => cancelOrder(exID, authToken, order)}
    rowMapping={ROW_MAPPING}
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
