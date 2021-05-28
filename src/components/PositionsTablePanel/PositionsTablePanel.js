import React, { memo } from 'react'
import PropTypes from 'prop-types'

import PositionsTable from '../PositionsTable'
import Panel from '../../ui/Panel'

const PositionsTablePanel = ({ onRemove, positions, dark }) => (
  <Panel
    label='POSITIONS'
    onRemove={onRemove}
    dark={dark}
    darkHeader={dark}
  >
    <PositionsTable
      filteredPositions={positions}
    />
  </Panel>
)

PositionsTablePanel.propTypes = {
  onRemove: PropTypes.func.isRequired,
  positions: PropTypes.arrayOf(PropTypes.object),
  dark: PropTypes.bool,
}

PositionsTablePanel.defaultProps = {
  positions: [],
  dark: true,
}

export default memo(PositionsTablePanel)
