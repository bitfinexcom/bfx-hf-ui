import React from 'react'
import BalancesTableColumns from './BalancesTable.columns'

import { propTypes, defaultProps } from './BalancesTable.props'
import Table from '../../ui/Table'

import './style.css'

import i18n from './i18n.json'

export default class BalancesTable extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      balances = [], hideZeroBalances, lang,
    } = this.props
    const dictionary = i18n[lang]
    const filteredBalances = hideZeroBalances
      ? balances.filter(b => +b.balance > 0)
      : balances

    return (
      <Table
        data={filteredBalances}
        columns={BalancesTableColumns(dictionary)}
        defaultSortBy='mts'
        defaultSortDirection='ASC'
      />
    )
  }
}
