import React from 'react'
import PropTypes from 'prop-types'
import _isEqual from 'lodash/isEqual'
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
      activeMarket, positions, setFilteredValueWithKey,
    } = this.props
    const { marketFilterActive } = this.state
    const filteredPositions = marketFilterActive
      ? positions.filter(p => p.symbol === activeMarket.wsID)
      : positions

    this.setState({ filteredPositions })
    setFilteredValueWithKey('filteredPositions', filteredPositions)
    return filteredPositions
  }

  render() {
    const { closePosition, authToken } = this.props
    const { filteredPositions = [] } = this.state

    return (
      <Table
        data={filteredPositions}
        columns={PositionsTableColumns({ authToken, closePosition })}
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
  activeMarket: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  ),
  positions: PropTypes.array, // eslint-disable-line
}

PositionsTable.defaultProps = {
  activeMarket: {},
  positions: [],
}

export default PositionsTable
