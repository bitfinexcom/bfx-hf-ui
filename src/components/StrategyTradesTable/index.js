import React from 'react'
import StrategyTradesTableColumns from './StrategyTradesTable.columns'

import Panel from '../../ui/Panel'
import Table from '../../ui/Table'
import { propTypes, defaultProps } from './StrategyTradesTable.props'
import './style.css'

export default class StrategyTradesTable extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { label, trades, onTradeClick } = this.props

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
