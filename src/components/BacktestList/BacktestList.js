import React from 'react'
import Panel from '../../ui/Panel'
import Table from '../../ui/Table'

import BacktestListColumns from './BacktestList.columns'
import { propTypes, defaultProps } from './BacktestList.props'

export default class BacktestList extends React.PureComponent {
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
    const { bts } = this.props

    return (
      <Panel label='Backtests' contentClassName='table__wrapper small'>
        <Table
          data={bts}
          columns={BacktestListColumns}
          onRowClick={this.onRowClick}
          defaultSortBy='id'
          defaultSortDirection='DESC'
        />
      </Panel>
    )
  }
}
