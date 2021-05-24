import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { VirtualTable } from '@ufx-ui/core'
import PositionsTableColumns from './PositionsTable.columns'

import './style.css'

const PositionsTable = (props) => {
  const { closePosition, authToken, positions } = props

  return (
    <VirtualTable
      data={positions}
      columns={PositionsTableColumns({ authToken, closePosition })}
      defaultSortBy='mts'
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
