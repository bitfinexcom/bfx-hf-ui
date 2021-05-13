import React from 'react'
import PropTypes from 'prop-types'
import { VirtualTable } from '@ufx-ui/core'
import _isEmpty from 'lodash/isEmpty'

import AlgoOrdersTableColumns from './AlgoOrdersTable.columns'
import './style.css'

const AlgoOrdersTable = ({
  filteredAO: orders, cancelOrder, authToken, gaCancelOrder,
}) => (
  <div className='hfui-aolist__wrapper'>
    {_isEmpty(orders) ? (
      <p className='empty'>No active algorithmic orders</p>
    ) : (
      <VirtualTable
        data={orders}
        columns={AlgoOrdersTableColumns(authToken, cancelOrder, gaCancelOrder)}
        defaultSortBy='gid'
        defaultSortDirection='ASC'
        rowHeight={30}
      />
    )}
  </div>
)

AlgoOrdersTable.propTypes = {
  cancelOrder: PropTypes.func.isRequired,
  gaCancelOrder: PropTypes.func.isRequired,
  filteredAO: PropTypes.arrayOf(PropTypes.object),
  authToken: PropTypes.string.isRequired,
}

AlgoOrdersTable.defaultProps = {
  filteredAO: [],
}

export default React.memo(AlgoOrdersTable)
