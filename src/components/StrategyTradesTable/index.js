import React from 'react'
import StrategyTradesTableColumns from './StrategyTradesTable.columns'

import Panel from '../../ui/Panel'
import Table from '../../ui/Table'

import './style.css'

export default class StrategyTradesTable extends React.PureComponent {
  render() {
    const { label = 'STRATEGY TRADES', trades, onTradeClick } = this.props

    return (
      <Panel
        label={label}
        removeable={false}
        moveable={false}
        className='dtc-strategytradestable__wrapper'
      >
        <Table
          data={trades}
          columns={StrategyTradesTableColumns}
          defaultSortBy='mts'
          defaultSortDirection='DESC'
          onRowClick={({ rowData }) => onTradeClick(rowData)}
        />
      </Panel>
    )
  }
}