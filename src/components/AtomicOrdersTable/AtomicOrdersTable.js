import React from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import { VirtualTable } from '@ufx-ui/core'

import AtomicOrdersTableColumns from './AtomicOrdersTable.columns'
import './style.css'

const AtomicOrdersTable = ({
  filteredAtomicOrders: orders, cancelOrder, authToken, gaCancelOrder,
}) => (
  <div className='hfui-orderstable__wrapper'>
    {_isEmpty(orders) ? (
      <p className='empty'>No active atomic orders</p>
    ) : (
      <VirtualTable
        data={orders}
        columns={AtomicOrdersTableColumns(authToken, cancelOrder, gaCancelOrder)}
        defaultSortBy='id'
        defaultSortDirection='ASC'
      />
    )}
  </div>
)

AtomicOrdersTable.propTypes = {
  authToken: PropTypes.string.isRequired,
  filteredAtomicOrders: PropTypes.arrayOf(PropTypes.object),
  cancelOrder: PropTypes.func.isRequired,
  gaCancelOrder: PropTypes.func.isRequired,
}

AtomicOrdersTable.defaultProps = {
  filteredAtomicOrders: [],
}

export default AtomicOrdersTable
