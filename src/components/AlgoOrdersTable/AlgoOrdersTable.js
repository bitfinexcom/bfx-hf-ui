import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'ufx-ui'

import './style.css'

const AlgoOrdersTable = ({
  apiClientState, filteredAO: orders, cancelOrder, authToken,
}) => (
  <div className='hfui-aolist__wrapper'>
    <Table interactive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Context</th>
          <th>Created</th>
          <th>Symbol</th>
          <th>Label</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(ao => (
          <tr key={ao.gid}>
            <td>{ao.name}</td>
            <td>{ao.args._margin ? 'Margin' : 'Exchange'}</td>
            <td>{new Date(+ao.gid).toLocaleString()}</td>
            <td>{ao.args.symbol}</td>
            <td>{ao.label}</td>
            <td className='controls'>
              {apiClientState === 2 ? (
                <i
                  role='button'
                  tabIndex={0}
                  className='icon-cancel'
                  onClick={() => cancelOrder(authToken, ao)}
                />
              ) : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

    {orders.length === 0 && (
      <p className='empty'>No active algorithmic orders</p>
    )}
  </div>
)

AlgoOrdersTable.propTypes = {
  cancelOrder: PropTypes.func.isRequired,
  filteredAO: PropTypes.arrayOf(PropTypes.object),
  apiClientState: PropTypes.number.isRequired,
  authToken: PropTypes.string.isRequired,
}

AlgoOrdersTable.defaultProps = {
  filteredAO: [],
}

export default React.memo(AlgoOrdersTable)
