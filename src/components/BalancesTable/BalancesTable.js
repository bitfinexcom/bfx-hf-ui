import React from 'react'
import BalancesTableColumns from './BalancesTable.columns'

import { propTypes, defaultProps } from './BalancesTable.props'
import Table from '../../ui/Table'

import './style.css'

// TODO: Extract props
export default class BalancesTable extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { balances, hideZeroBalances } = this.props

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
}
