import React from 'react'
import PositionsTableColumns from './PositionsTable.columns'

import Table from '../../ui/Table'
import { propTypes, defaultProps } from './PositionsTable.props'
import './style.css'

export default class PositionsTable extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      exID, filteredPositions: positions = [], closePosition, authToken,
    } = this.props

    return (
      <Table
        data={positions}
        columns={PositionsTableColumns({ exID, authToken, closePosition })}
        defaultSortBy='mts'
        defaultSortDirection='ASC'
      />
    )
  }
}
