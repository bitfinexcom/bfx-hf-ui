import React from 'react'
import PositionsTableColumns from './PositionsTable.columns'

import Table from '../../ui/Table'

import './style.css'

// TODO: Extract props
export default class PositionsTable extends React.PureComponent {
  render() {
    const { exID, positions, closePosition } = this.props

    return (
      <Table
        data={positions}
        columns={PositionsTableColumns({ exID, closePosition })}
        defaultSortBy='mts'
        defaultSortDirection='ASC'
      />
    )
  }
}