import React from 'react'
import { flatten as _flatten, isEqual as _isEqual } from 'lodash'
import AtomicOrdersTable from '../AtomicOrdersTable'
import Panel from '../../ui/Panel'
import { propTypes, defaultProps } from './AtomicOrdersTablePanel.props'

export default class AtomicOrdersTablePanel extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps
  state = {
    filteredAtomicOrders: [],
  }

  componentDidMount() {
    this.getFilteredAtomicOrders()
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
      activeExchange, activeMarket, setFilteredValueWithKey, atomicOrders = [],
    } = this.props
    const { exchangeFilterActive, marketFilterActive } = this.state

    const filteredByExchange = exchangeFilterActive
      ? Object.values(atomicOrders[activeExchange] || {})
      : _flatten(Object.values(atomicOrders).map(Object.values))
    const filteredAtomicOrders = marketFilterActive
      ? filteredByExchange.filter(o => o.symbol === activeMarket.wsID)
      : filteredByExchange

    this.setState({ filteredAtomicOrders })
    setFilteredValueWithKey('filteredAtomicOrders', filteredAtomicOrders)
    return filteredAtomicOrders
  }

  render() {
    const { onRemove, activeExchange } = this.props
    const { filteredAtomicOrders } = this.state
    return (
      <Panel
        label='ATOMIC ORDERS'
        onRemove={onRemove}
      >
        <AtomicOrdersTable
          exID={activeExchange}
          filteredAtomicOrders={filteredAtomicOrders}
        />
      </Panel>
    )
  }
}
