import React from 'react'
import PropTypes from 'prop-types'
import _isEqual from 'lodash/isEqual'
import AtomicOrdersTable from '../AtomicOrdersTable'
import Panel from '../../ui/Panel'

class AtomicOrdersTablePanel extends React.Component {
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
      activeMarket, setFilteredValueWithKey, atomicOrders,
    } = this.props
    const { marketFilterActive } = this.state
    const filteredAtomicOrders = marketFilterActive
      ? atomicOrders.filter(o => o.symbol === activeMarket.wsID)
      : atomicOrders

    this.setState({ filteredAtomicOrders })
    setFilteredValueWithKey('filteredAtomicOrders', filteredAtomicOrders)
    return filteredAtomicOrders
  }

  render() {
    const { onRemove } = this.props
    const { filteredAtomicOrders } = this.state
    console.log(filteredAtomicOrders)
    return (
      <Panel
        label='ATOMIC ORDERS'
        onRemove={onRemove}
      >
        <AtomicOrdersTable filteredAtomicOrders={filteredAtomicOrders} />
      </Panel>
    )
  }
}

AtomicOrdersTablePanel.propTypes = {
  setFilteredValueWithKey: PropTypes.func.isRequired,
  atomicOrders: PropTypes.arrayOf(PropTypes.object),
  activeMarket: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  ),
  onRemove: PropTypes.func,
}

AtomicOrdersTablePanel.defaultProps = {
  atomicOrders: [],
  activeMarket: {},
  onRemove: () => {},
}

export default AtomicOrdersTablePanel
