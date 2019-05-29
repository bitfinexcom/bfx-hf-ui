import React from 'react'

import Panel from '../../ui/Panel'
import Table from '../../ui/Table'
import StrategyTableColumns from './StrategyTable.columns'
import { propTypes, defaultProps } from './StrategyTable.props'

export default class StrategyTable extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.onRowClick = this.onRowClick.bind(this)
  }

  onRowClick ({ index } = {}) {
    const { onSelect, strategies } = this.props
    onSelect(strategies[index])
  }

  render () {
    const { strategies, orders } = this.props
    const stratObjects = strategies.map(s => ({
      name: s[1],
      mts: s[3],
      status: s[2] ? 'ACTIVE' : 'STOPPED',
      orderCount: orders.filter(o => o[1] === +s[0]).length,
      symbol: (orders.find(o => o[1] === +s[0]) || {})[3] || ''
    }))

    return (
      <Panel label='Strategies' contentClassName='table__wrapper'>
        <Table
          data={stratObjects}
          columns={StrategyTableColumns}
          onRowClick={this.onRowClick}
          defaultSortBy='mts'
          defaultSortDirection='ASC'
        />
      </Panel>
    )
  }
}
