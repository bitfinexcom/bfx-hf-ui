import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { VirtualTable } from '@ufx-ui/core'
import _isEmpty from 'lodash/isEmpty'
import PositionsTableColumns from './PositionsTable.columns'

const PositionsTable = (props) => {
  const {
    closePosition, authToken, filteredPositions, positions, renderedInTradingState,
  } = props

  const data = renderedInTradingState ? positions : filteredPositions

  if (_isEmpty(data)) {
    return <p className='empty'>No active positions found</p>
  }

  return (
    <VirtualTable
      data={data}
      columns={PositionsTableColumns({ authToken, closePosition })}
      defaultSortBy='id'
      defaultSortDirection='ASC'
    />
  )
}

PositionsTable.propTypes = {
  closePosition: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired,
  filteredPositions: PropTypes.arrayOf(PropTypes.object),
  positions: PropTypes.arrayOf(PropTypes.object),
  renderedInTradingState: PropTypes.bool,
}

PositionsTable.defaultProps = {
  filteredPositions: [],
  positions: [],
  renderedInTradingState: true,
}

export default memo(PositionsTable)
