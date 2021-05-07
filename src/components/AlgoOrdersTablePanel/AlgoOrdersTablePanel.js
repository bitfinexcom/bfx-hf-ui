/* eslint-disable react/prop-types */
import React from 'react'
import _isEqual from 'lodash/isEqual'

import AlgoOrdersTable from '../AlgoOrdersTable'
import Panel from '../../ui/Panel'

export default class AlgoOrdersTablePanel extends React.Component {
  state = {
    algoOrders: [],
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (!_isEqual(nextProps, this.props) || !_isEqual(nextState, this.state))
  }
  componentDidUpdate() {}
  getSnapshotBeforeUpdate() {
    const algoOrders = this.getFilteredAlgoOrders()
    this.setState({ algoOrders })
    return null
  }
  getFilteredAlgoOrders() {
    const {
      activeMarket, algoOrders, setFilteredValueWithKey,
    } = this.props
    const { marketFilterActive } = this.state
    const filteredAO = marketFilterActive
      ? algoOrders.filter(ao => ao.args.symbol === activeMarket.wsID)
      : algoOrders

    setFilteredValueWithKey('filteredAO', filteredAO)
    return filteredAO
  }
  render() {
    const { onRemove } = this.props
    const { algoOrders } = this.state
    return (
      <Panel label='ALGO ORDERS' onRemove={onRemove}>
        <AlgoOrdersTable filteredAO={algoOrders} />
      </Panel>
    )
  }
}
