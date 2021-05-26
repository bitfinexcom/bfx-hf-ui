import React, { memo } from 'react'
import PropTypes from 'prop-types'

import PositionsTable from '../PositionsTable'
import Panel from '../../ui/Panel'

const PositionsTablePanel = ({ onRemove, positions }) => (
  <Panel
    label='Positions'
    onRemove={onRemove}
  >
    <PositionsTable
      filteredPositions={positions}
    />
  </Panel>
)

PositionsTablePanel.propTypes = {
  onRemove: PropTypes.func.isRequired,
  positions: PropTypes.arrayOf(PropTypes.object),
}

PositionsTablePanel.defaultProps = {
  positions: [],
}

export default memo(PositionsTablePanel)
