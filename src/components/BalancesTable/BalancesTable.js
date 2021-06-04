import React, { memo } from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import { VirtualTable } from '@ufx-ui/core'

import BalancesTableColumns from './BalancesTable.columns'

const BalancesTable = ({
  renderedInTradingState, filteredBalances, balances, hideZeroBalances,
}) => {
  const data = renderedInTradingState ? filteredBalances : balances
  const filtered = hideZeroBalances
    ? data.filter(b => +b.balance > 0)
    : data

  if (_isEmpty(filtered)) {
    return (
      <p className='empty'>No balances available</p>
    )
  }

  return (
    <VirtualTable
      data={filtered}
      columns={BalancesTableColumns()}
      defaultSortBy='context'
      defaultSortDirection='ASC'
    />
  )
}

BalancesTable.propTypes = {
  balances: PropTypes.arrayOf(PropTypes.object),
  filteredBalances: PropTypes.arrayOf(PropTypes.object),
  renderedInTradingState: PropTypes.bool,
  hideZeroBalances: PropTypes.bool,
}

BalancesTable.defaultProps = {
  balances: [],
  filteredBalances: [],
  renderedInTradingState: false,
  hideZeroBalances: true,
}

export default memo(BalancesTable)
