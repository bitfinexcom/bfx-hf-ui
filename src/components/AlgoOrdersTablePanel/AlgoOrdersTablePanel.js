import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'

import AlgoOrdersTable from '../AlgoOrdersTable'
import Panel from '../../ui/Panel'

const AlgoOrdersTablePanel = ({
  dark, onRemove, algoOrders, setFilteredValueWithKey,
}) => {
  useEffect(() => {
    setFilteredValueWithKey('filteredAO', algoOrders)
  }, [algoOrders])

  return (
    <Panel
      label='ALGO ORDERS'
      onRemove={onRemove}
      dark={dark}
      darkHeader={dark}
    >
      <AlgoOrdersTable filteredAO={algoOrders} />
    </Panel>
  )
}

AlgoOrdersTablePanel.propTypes = {
  dark: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
  algoOrders: PropTypes.arrayOf(PropTypes.object),
  setFilteredValueWithKey: PropTypes.func.isRequired,
}

AlgoOrdersTablePanel.defaultProps = {
  dark: true,
  algoOrders: [],
}

export default memo(AlgoOrdersTablePanel)
