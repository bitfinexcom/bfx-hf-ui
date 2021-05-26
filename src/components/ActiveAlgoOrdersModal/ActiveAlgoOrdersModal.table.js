import React from 'react'
import PropTypes from 'prop-types'
import { Table, Checkbox } from '@ufx-ui/core'
import _map from 'lodash/map'

import './style.css'

const AlgoOrdersTable = ({
  orders,
  onOrderSelect,
  isOrderSelected,
  onAllOrdersSelect,
  isAllOrdersSelected,
}) => (
  <Table className='hfui-active-ao-modal__table'>
    <thead>
      <tr>
        <th>Action</th>
        <th>Symbol</th>
        <th>Name</th>
        <th>Context</th>
        <th>Created</th>
        <th>Label</th>
      </tr>
    </thead>
    <tbody>
      {_map(orders, ao => {
        const selected = isOrderSelected(ao.gid)

        return (
          <tr
            key={ao.gid}
            onClick={() => onOrderSelect(!selected, ao.gid, ao.algoID)}
          >
            <td>
              <Checkbox
                checked={selected}
                onChange={e => onOrderSelect(e, ao.gid, ao.algoID)}
              />
            </td>
            <td>
              <p>
                {ao.args.symbol}
              </p>
            </td>
            <td>
              <p>
                {ao.name}
              </p>
            </td>
            <td>
              <p>
                {ao.args._margin ? 'Margin' : 'Exchange'}
              </p>
            </td>
            <td>
              <p>
                {new Date(+ao.gid).toLocaleString()}
              </p>
            </td>
            <td>
              <p>
                {ao.label}
              </p>
            </td>
          </tr>
        )
      })}
      <tr>
        <td colSpan='6'>
          <Checkbox
            label='Select All'
            checked={isAllOrdersSelected()}
            onChange={e => onAllOrdersSelect(e)}
          />
        </td>
      </tr>
    </tbody>
  </Table>
)

AlgoOrdersTable.propTypes = {
  isOrderSelected: PropTypes.func,
  isAllOrdersSelected: PropTypes.func,
  onOrderSelect: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(PropTypes.object),
  onAllOrdersSelect: PropTypes.func.isRequired,
}

AlgoOrdersTable.defaultProps = {
  orders: [],
  isOrderSelected: () => false,
  isAllOrdersSelected: () => false,
}

export default React.memo(AlgoOrdersTable)
