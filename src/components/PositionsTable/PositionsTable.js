import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { VirtualTable } from '@ufx-ui/core'
import _isEmpty from 'lodash/isEmpty'
import PositionsTableColumns from './PositionsTable.columns'

const PositionsTable = (props) => {
  const { closePosition, authToken, positions } = props

  if (_isEmpty(positions)) {
    return <p className='empty'>No active positions found</p>
  }

  return (
    <VirtualTable
      data={positions}
      columns={PositionsTableColumns({ authToken, closePosition })}
      defaultSortBy='id'
      defaultSortDirection='ASC'
    />
  )
}

PositionsTable.propTypes = {
  closePosition: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired,
  positions: PropTypes.arrayOf(PropTypes.object),
}

PositionsTable.defaultProps = {
  positions: [],
}

export default memo(PositionsTable)
