import React from 'react'
import _isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import { Checkbox } from '@ufx-ui/core'

import BalancesTable from '../BalancesTable'
import Panel from '../../ui/Panel'
import PanelSettings from '../../ui/PanelSettings'

import './style.css'

class BalancesTablePanel extends React.Component {
  state = {
    settingsOpen: false,
    hideZeroBalances: true,
  }

  constructor(props) {
    super(props)

    this.onToggleSettings = this.onToggleSettings.bind(this)
    this.onChangeHideZeroBalances = this.onChangeHideZeroBalances.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (!_isEqual(nextProps, this.props) || !_isEqual(nextState, this.state))
  }
  componentDidUpdate() {}
  getSnapshotBeforeUpdate() {
    const balances = this.getFilteredBalances()
    this.setState({ balances })
    return null
  }

  onToggleSettings() {
    this.setState(({ settingsOpen }) => ({
      settingsOpen: !settingsOpen,
    }))
  }

  onChangeHideZeroBalances(hideZeroBalances) {
    this.setState(() => ({ hideZeroBalances }))
  }

  getFilteredBalances() {
    const { balances, setFilteredValueWithKey } = this.props

    setFilteredValueWithKey('filteredBalances', balances)
    return balances
  }

  deferSaveState() {
    setTimeout(() => {
      this.saveState()
    }, 0)
  }

  render() {
    const {
      settingsOpen, hideZeroBalances, balances = [],
    } = this.state
    const { onRemove } = this.props

    // TODO: Extract settings panel/wrapper into own component
    return (
      <Panel
        label='BALANCES'
        onRemove={onRemove}
        settingsOpen={settingsOpen}
        onToggleSettings={this.onToggleSettings}
      >
        {settingsOpen ? (
          <PanelSettings
            onClose={this.onToggleSettings}
            content={(
              <Checkbox
                label='Hide Zero Balances'
                checked={hideZeroBalances}
                onChange={this.onChangeHideZeroBalances}
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
}

BalancesTablePanel.propTypes = {
  balances: PropTypes.arrayOf(PropTypes.object),
  setFilteredValueWithKey: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
}

BalancesTablePanel.defaultProps = {
  onRemove: () => {},
  balances: [],
}

export default BalancesTablePanel
