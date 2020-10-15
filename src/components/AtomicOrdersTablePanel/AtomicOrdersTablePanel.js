import React from 'react'
import { flatten as _flatten, isEqual as _isEqual } from 'lodash'
import AtomicOrdersTable from '../AtomicOrdersTable'
import Panel from '../../ui/Panel'
import { propTypes, defaultProps } from './AtomicOrdersTablePanel.props'

export default class AtomicOrdersTablePanel extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps
  state = {
    atomicOrders: [],
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (!_isEqual(nextProps, this.props) || !_isEqual(nextState, this.state))
  }
  componentDidUpdate() {}
  getSnapshotBeforeUpdate() {
    const atomicOrders = this.getFilteredAtomicOrders()
    this.setState({ atomicOrders })
    return null
  }

  getFilteredAtomicOrders() {
    const {
      activeExchange, activeMarket, setFiltredValueWithKey, atomicOrders = [],
    } = this.props
    const { exchangeFilterActive, marketFilterActive } = this.state

    const filteredByExchange = exchangeFilterActive
      ? Object.values(atomicOrders[activeExchange] || {})
      : _flatten(Object.values(atomicOrders).map(Object.values))
    const filtredAtomicOrders = marketFilterActive
      ? filteredByExchange.filter(o => o.symbol === activeMarket.wsID)
      : filteredByExchange
    setFiltredValueWithKey('filtredAtomicOrders', filtredAtomicOrders)
    return filtredAtomicOrders
  }

  render() {
    const { onRemove, activeExchange } = this.props
    const { atomicOrders } = this.state
    return (
      <Panel
        label='ATOMIC ORDERS'
        onRemove={onRemove}
      >
        <AtomicOrdersTable
          exID={activeExchange}
          filtredAtomicOrders={atomicOrders}
        />
      </Panel>
    )
  }
}
