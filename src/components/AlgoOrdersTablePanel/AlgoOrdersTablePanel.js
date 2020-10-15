import React from 'react'
import { flatten as _flatten, isEqual as _isEqual } from 'lodash'

import AlgoOrdersTable from '../AlgoOrdersTable'
import Panel from '../../ui/Panel'
import { propTypes, defaultProps } from './AlgoOrdersTablePanel.props'

export default class AlgoOrdersTablePanel extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps
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
      activeExchange, activeMarket, algoOrders, setFilteredValueWithKey,
    } = this.props
    const { exchangeFilterActive, marketFilterActive } = this.state

    const filteredByExchange = exchangeFilterActive
      ? Object.values(algoOrders[activeExchange] || {})
      : _flatten(Object.values(algoOrders).map(Object.values))
    const filteredAO = marketFilterActive
      ? filteredByExchange.filter(ao => ao.args.symbol === activeMarket.wsID)
      : filteredByExchange
    setFilteredValueWithKey('filteredAO', filteredAO)
    return filteredAO
  }
  render() {
    const { onRemove, activeExchange } = this.props
    const { algoOrders } = this.state
    return (
      <Panel
        label='ALGO ORDERS'
        onRemove={onRemove}
      >
        <AlgoOrdersTable
          exID={activeExchange}
          filteredAO={algoOrders}
        />
      </Panel>
    )
  }
}
