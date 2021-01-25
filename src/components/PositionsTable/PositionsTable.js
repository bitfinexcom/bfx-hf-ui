import React from 'react'
import { flatten as _flatten, isEqual as _isEqual } from 'lodash'
import PositionsTableColumns from './PositionsTable.columns'

import Table from '../../ui/Table'
import { propTypes, defaultProps } from './PositionsTable.props'
import './style.css'

export default class PositionsTable extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    filteredPositions: [],
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (!_isEqual(nextProps, this.props) || !_isEqual(nextState, this.state))
  }
  componentDidUpdate() {}
  getSnapshotBeforeUpdate() {
    const filteredPositions = this.getFilteredPositions()
    this.setState({ filteredPositions })
    return null
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

  render() {
    const {
      exID, closePosition, authToken,
    } = this.props
    const { filteredPositions = [] } = this.state
    return (
      <Table
        data={filteredPositions}
        columns={PositionsTableColumns({ exID, authToken, closePosition })}
        defaultSortBy='mts'
        defaultSortDirection='ASC'
      />
    )
  }
}
