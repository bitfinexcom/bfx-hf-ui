import React from 'react'

import Panel from '../../ui/Panel'
import Table from '../../ui/Table'
import AlgoOrderTableColumns from './AlgoOrderTable.columns'
import { propTypes, defaultProps } from './AlgoOrderTable.props'

export default class AlgoOrderTable extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor (props) {
    super(props)
    this.onRowClick = this.onRowClick.bind(this)
  }

  onRowClick ({ rowData = {} } = {}) {
    const { onSelect } = this.props
    onSelect(rowData)
  }

  render () {
    const { orders } = this.props

    return (
      <Panel label='Algo Orders' contentClassName='table__wrapper'>
        <Table
          data={orders}
          columns={AlgoOrderTableColumns}
          onRowClick={this.onRowClick}
          defaultSortBy='mts'
          defaultSortDirection='ASC'
        />
      </Panel>
    )
  }
}
