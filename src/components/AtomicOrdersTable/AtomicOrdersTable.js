import React from 'react'
import AtomicOrdersTableColumns from './AtomicOrdersTable.columns'

import { propTypes, defaultProps } from './AtomicOrdersTable.props'
import Table from '../../ui/Table'
import './style.css'

import i18n from './i18n.json'

export default class AtomicOrdersTable extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      exID, orders, cancelOrder, authToken, gaCancelOrder, lang,
    } = this.props
    const dictionary = i18n[lang]
    return (
      <Table
        data={orders}
        columns={AtomicOrdersTableColumns(exID, authToken, cancelOrder, gaCancelOrder, dictionary)}
        onRowClick={this.onRowClick}
        defaultSortBy='mts'
        defaultSortDirection='ASC'
      />
    )
  }
}
