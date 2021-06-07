import React, { memo } from 'react'
import PropTypes from 'prop-types'

import BalancesTableColumns from './BalancesTable.columns'
import Table from '../../ui/Table'

const BalancesTable = ({
  renderedInTradingState, filteredBalances, balances, hideZeroBalances,
}) => {
  const data = renderedInTradingState ? filteredBalances : balances
  const filtered = hideZeroBalances
    ? data.filter(b => +b.balance > 0)
    : data

  return (
    <Table
      data={filtered}
      columns={BalancesTableColumns()}
      defaultSortBy='mts'
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
