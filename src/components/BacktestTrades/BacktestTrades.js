import React from 'react'

import Panel from '../../ui/Panel'
import Table from '../../ui/Table'
import BacktestTradesColumns from './BacktestTrades.columns'
import { propTypes, defaultProps } from './BacktestTrades.props'

export default class BacktestTrades extends React.PureComponent {
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
    const { trades } = this.props

    return (
      <Panel label='Backtest Trades' contentClassName='table__wrapper'>
        <Table
          data={trades}
          columns={BacktestTradesColumns}
          onRowClick={this.onRowClick}
          defaultSortBy='mts'
          defaultSortDirection='ASC'
        />
      </Panel>
    )
  }
}
