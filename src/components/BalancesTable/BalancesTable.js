import React, { memo } from 'react'
import PropTypes from 'prop-types'

import BalancesTableColumns from './BalancesTable.columns'
import Table from '../../ui/Table'

const BalancesTable = ({ balances, hideZeroBalances }) => {
  const filteredBalances = hideZeroBalances
    ? balances.filter(b => +b.balance > 0)
    : balances

  return (
    <Table
      data={filteredBalances}
      columns={BalancesTableColumns()}
      defaultSortBy='mts'
      defaultSortDirection='ASC'
    />
  )
}

BalancesTable.propTypes = {
  balances: PropTypes.arrayOf(PropTypes.object),
  hideZeroBalances: PropTypes.bool,
}

BalancesTable.defaultProps = {
  balances: [],
  hideZeroBalances: true,
}

export default memo(BalancesTable)
