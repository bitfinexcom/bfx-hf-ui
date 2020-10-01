import React from 'react'
import _capitalize from 'lodash/capitalize'

import BalancesTable from '../BalancesTable'
import Checkbox from '../../ui/Checkbox'
import Select from '../../ui/Select'
import Panel from '../../ui/Panel'
import PanelSettings from '../../ui/PanelSettings'

import { propTypes, defaultProps } from './BalancesTablePanel.props'
import './style.css'

export default class BalancesTablePanel extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    settingsOpen: false,
    hideZeroBalances: true,
  }

  constructor(props) {
    super(props)

    const { savedState = {} } = props
    const { currentExchange, exchangeDirty } = savedState

    this.state = {
      ...this.state,
      currentExchange,
      exchangeDirty,
    }

    this.onChangeExchange = this.onChangeExchange.bind(this)
    this.onToggleSettings = this.onToggleSettings.bind(this)
    this.onChangeHideZeroBalances = this.onChangeHideZeroBalances.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { exchangeDirty, currentExchange } = prevState
    const { activeExchange } = nextProps

    if (exchangeDirty || activeExchange === currentExchange) {
      return {}
    }

    return {
      currentExchange: activeExchange,
    }
  }

  onToggleSettings() {
    this.setState(({ settingsOpen }) => ({
      settingsOpen: !settingsOpen,
    }))
  }

  onChangeHideZeroBalances(hideZeroBalances) {
    this.setState(() => ({ hideZeroBalances }))
  }

  onChangeExchange(option) {
    const { value: exchange } = option
    const { currentExchange } = this.state

    if (exchange === currentExchange) {
      return
    }

    this.setState(() => ({
      currentExchange: exchange,
      exchangeDirty: true,
    }))

    this.deferSaveState()
  }

  deferSaveState() {
    setTimeout(() => {
      this.saveState()
    }, 0)
  }

  saveState() {
    const { saveState, layoutID, layoutI } = this.props
    const { currentExchange, exchangeDirty } = this.state

    saveState(layoutID, layoutI, {
      currentExchange,
      exchangeDirty,
    })
  }

  renderExchangeDropdown() {
    const { exchangeDirty, currentExchange } = this.state
    const { exchanges, canChangeExchange } = this.props

    return (
      <Select
        disabled={!canChangeExchange}
        className={{ yellow: exchangeDirty }}
        onChange={this.onChangeExchange}
        value={{
          label: _capitalize(currentExchange),
          value: currentExchange,
        }}
        options={exchanges.map(ex => ({
          label: _capitalize(ex),
          value: ex,
        }))}
      />
    )
  }

  render() {
    const { currentExchange, settingsOpen, hideZeroBalances } = this.state
    const { onRemove, showExchange } = this.props

    // TODO: Extract settings panel/wrapper into own component
    return (
      <Panel
        label='BALANCES'
        onRemove={onRemove}
        headerComponents={showExchange && this.renderExchangeDropdown()}
        settingsOpen={settingsOpen}
        onToggleSettings={this.onToggleSettings}
      >
        {settingsOpen ? (
          <PanelSettings
            onClose={this.onToggleSettings}
            content={(
              <Checkbox
                label='Hide Zero Balances'
                value={hideZeroBalances}
                onChange={this.onChangeHideZeroBalances}
              />
            )}
          />
        ) : (
          <BalancesTable
            exID={currentExchange}
            hideZeroBalances={hideZeroBalances}
          />
        )}
      </Panel>
    )
  }
}
