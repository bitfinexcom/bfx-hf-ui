import React from 'react'
import _capitalize from 'lodash/capitalize'
import _flatten from 'lodash/flatten'
import _isEqual from 'lodash/isEqual'
import PositionsTable from '../PositionsTable'
import Select from '../../ui/Select'
import Panel from '../../ui/Panel'
import { propTypes, defaultProps } from './PositionsTablePanel.props'

export default class PositionsTablePanel extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    const { savedState = {} } = props
    const { currentExchange, exchangeDirty } = savedState

    this.state = {
      currentExchange,
      exchangeDirty,
    }

    this.onChangeExchange = this.onChangeExchange.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (!_isEqual(nextProps, this.props) || !_isEqual(nextState, this.state))
  }
  componentDidUpdate() {}
  getSnapshotBeforeUpdate() {
    const positions = this.getFilteredPositions()
    this.setState({ positions })
    return null
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
  getFilteredPositions() {
    const {
      activeExchange, activeMarket, positions, setFilteredValueWithKey,
    } = this.props
    const { exchangeFilterActive, marketFilterActive } = this.state

    const filteredByExchange = exchangeFilterActive
      ? Object.values(positions[activeExchange] || {})
      : _flatten(Object.values(positions).map(Object.values))
    const filteredPositions = marketFilterActive
      ? filteredByExchange.filter(p => p.symbol === activeMarket.wsID)
      : filteredByExchange
    setFilteredValueWithKey('filteredPositions', filteredPositions)
    return filteredPositions
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
    const { exchanges } = this.props

    return (
      <Select
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
    const { currentExchange, positions = [] } = this.state
    const { onRemove } = this.props
    return (
      <Panel
        label='POSITIONS'
        onRemove={onRemove}
        headerComponents={this.renderExchangeDropdown()}
      >
        <PositionsTable
          exID={currentExchange}
          filteredPositions={positions}
        />
      </Panel>
    )
  }
}
