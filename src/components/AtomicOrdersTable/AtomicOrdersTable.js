import React from 'react'
import PropTypes from 'prop-types'

import AtomicOrdersTableColumns from './AtomicOrdersTable.columns'
import Table from '../../ui/Table'
import './style.css'

const AtomicOrdersTable = ({
  filteredAtomicOrders: orders, cancelOrder, authToken, gaCancelOrder,
}) => (
  <Table
    data={orders}
    columns={AtomicOrdersTableColumns(authToken, cancelOrder, gaCancelOrder)}
    defaultSortBy='mts'
    defaultSortDirection='ASC'
  />
)

AtomicOrdersTable.propTypes = {
  authToken: PropTypes.string.isRequired,
  filteredAtomicOrders: PropTypes.array.isRequired, // eslint-disable-line
  cancelOrder: PropTypes.func.isRequired,
  gaCancelOrder: PropTypes.func.isRequired,
}

export default AtomicOrdersTable
