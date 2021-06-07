import React, { useEffect, useState, memo } from 'react'
import PropTypes from 'prop-types'
import _isEqual from 'lodash/isEqual'
import { Checkbox } from '@ufx-ui/core'

import BalancesTable from '../BalancesTable'
import Panel from '../../ui/Panel'
import PanelSettings from '../../ui/PanelSettings'

import './style.css'

const BalancesTablePanel = ({
  balances, setFilteredValueWithKey, onRemove, dark,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [hideZeroBalances, setHideZeroBalances] = useState(true)

  useEffect(() => {
    setFilteredValueWithKey('filteredBalances', balances)
  }, [balances])

  const onToggleShowingSettings = () => setIsSettingsOpen(prevState => !prevState)

  // TODO: Extract settings panel/wrapper into own component
  return (
    <Panel
      label='Balances'
      onRemove={onRemove}
      settingsOpen={isSettingsOpen}
      onToggleSettings={onToggleShowingSettings}
      dark={dark}
      darkHeader={dark}
    >
      {isSettingsOpen ? (
        <PanelSettings
          onClose={onToggleShowingSettings}
          content={(
            <Checkbox
              label='Hide Zero Balances'
              checked={hideZeroBalances}
              onChange={setHideZeroBalances}
            />
            )}
        />
      ) : (
        <BalancesTable
          filteredBalances={balances}
          hideZeroBalances={hideZeroBalances}
        />
      )}
    </Panel>
  )
}

BalancesTablePanel.propTypes = {
  balances: PropTypes.arrayOf(PropTypes.object),
  setFilteredValueWithKey: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  dark: PropTypes.bool,
}

BalancesTablePanel.defaultProps = {
  onRemove: () => {},
  balances: [],
  dark: true,
}

export default memo(BalancesTablePanel, (prevProps, nextProps) => !_isEqual(prevProps, nextProps))
