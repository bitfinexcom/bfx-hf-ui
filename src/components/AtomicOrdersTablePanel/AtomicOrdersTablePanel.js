import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import AtomicOrdersTable from '../AtomicOrdersTable'
import Panel from '../../ui/Panel'

const AtomicOrdersTablePanel = ({
  dark, onRemove, setFilteredValueWithKey, atomicOrders,
}) => {
  useEffect(() => {
    setFilteredValueWithKey('filteredAtomicOrders', atomicOrders)
  }, [atomicOrders])

  return (
    <Panel
      label='ATOMIC ORDERS'
      onRemove={onRemove}
      dark={dark}
      darkHeader={dark}
    >
      <AtomicOrdersTable filteredAtomicOrders={atomicOrders} />
    </Panel>
  )
}

AtomicOrdersTablePanel.propTypes = {
  setFilteredValueWithKey: PropTypes.func.isRequired,
  atomicOrders: PropTypes.arrayOf(PropTypes.object),
  onRemove: PropTypes.func,
  dark: PropTypes.bool,
}

AtomicOrdersTablePanel.defaultProps = {
  atomicOrders: [],
  onRemove: () => {},
  dark: true,
}

export default memo(AtomicOrdersTablePanel)
