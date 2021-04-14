import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'ufx-ui'
import _isEmpty from 'lodash/isEmpty'

import WSTypes from '../../redux/constants/ws'
import './style.css'
import Header from './AlgoOrdersTable.Header'

const AlgoOrdersTable = ({
  apiClientState, filteredAO: orders, cancelOrder, authToken,
}) => (
  <div className='hfui-aolist__wrapper'>
    <Table interactive>
      <Header />
      <tbody>
        {orders.map(ao => {
          const {
            gid,
            name,
            args: {
              symbol,
              _margin,
            },
            label,
          } = ao

          return (
            <tr key={gid}>
              <td>{name}</td>
              <td>{_margin ? 'Margin' : 'Exchange'}</td>
              <td>{new Date(+gid).toLocaleString()}</td>
              <td>{symbol}</td>
              <td>{label}</td>
              <td className='controls'>
                {apiClientState === WSTypes.API_CLIENT_CONNECTED && (
                  <i
                    role='button'
                    tabIndex={0}
                    className='icon-cancel'
                    onClick={() => cancelOrder(authToken, ao)}
                  />
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>

    {_isEmpty(orders) && (
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
