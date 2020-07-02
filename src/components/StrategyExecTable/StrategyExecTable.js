import React from 'react'
import StrategyExecTableColumns from './StrategyExecTable.columns'

import { propTypes, defaultProps } from './StrategyExecTable.props'
import Table from '../../ui/Table'

import './style.css'

export default class StrategyExecTable extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { executions, showDuration } = this.props

    return (
      <Table
        data={executions}
        rowHeight={32}
        columns={StrategyExecTableColumns({ showDuration })}
        defaultSortBy='mts'
        defaultSortDirection='ASC'
      />
    )
  }
}
