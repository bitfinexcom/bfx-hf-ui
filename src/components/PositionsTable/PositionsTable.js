import React from 'react'
import PropTypes from 'prop-types'
import { flatten as _flatten, isEqual as _isEqual } from 'lodash'
import PositionsTableColumns from './PositionsTable.columns'

import Table from '../../ui/Table'
import './style.css'

class PositionsTable extends React.Component {
  state = {
    filteredPositions: [],
  }

  componentDidMount() {
    this.getFilteredPositions()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (!_isEqual(nextProps, this.props) || !_isEqual(nextState, this.state))
  }

  componentDidUpdate() {}
  getSnapshotBeforeUpdate() {
    this.getFilteredPositions()
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

    this.setState({ filteredPositions })
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

PositionsTable.propTypes = {
  closePosition: PropTypes.func.isRequired,
  setFilteredValueWithKey: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired,
  exID: PropTypes.string.isRequired,
  activeExchange: PropTypes.string,
  activeMarket: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  ),
  positions: PropTypes.objectOf(PropTypes.object),
}

PositionsTable.defaultProps = {
  activeExchange: 'bitfinex',
  activeMarket: {},
  positions: {},
}

export default PositionsTable
