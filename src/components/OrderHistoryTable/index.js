import React from 'react'

import Table from '../../ui/Table'
import Panel from '../../ui/Panel'
import OrderHistoryTableColumns from './OrderHistoryTable.columns'
import { propTypes, defaultProps } from './OrderHistoryTable.props'

import i18n from './i18n.json'

const dictionary = i18n['ru-RU']

export default class OrderHistoryTable extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.onRowClick = this.onRowClick.bind(this)
  }

  onRowClick({ index } = {}) {
    const { onSelect, orders } = this.props
    onSelect(orders[index])
  }

  render() {
    const { orders, onRemove, dark } = this.props

    return (
      <Panel
        label={dictionary.orderHistory}
        onRemove={onRemove}
        dark={dark}
        darkHeader={dark}
      >
        <Table
          data={orders}
          columns={OrderHistoryTableColumns}
          onRowClick={this.onRowClick}
          defaultSortBy='mts'
          defaultSortDirection='ASC'
        />
      </Panel>
    )
  }
}
