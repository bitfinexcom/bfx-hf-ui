import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import {
  getAllOrders,
  getAlgoOrders,
  getAllBalances,
  getAllPositions,
} from '../../redux/selectors/ws'
import {
  getActiveMarket,
  getComponentState,
  getActiveExchange,
  getPositionsCount,
  getAlgoOrdersCount,
  getAtomicOrdersCount,
} from '../../redux/selectors/ui'

import TradingStatePanel from './TradingStatePanel'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps

  return {
    activeExchange: getActiveExchange(state),
    activeMarket: getActiveMarket(state),
    savedState: getComponentState(state, layoutID, 'trading-state', id),
    algoOrders: getAlgoOrders(state),
    atomicOrders: getAllOrders(state),
    positions: getAllPositions(state),
    balances: getAllBalances(state),
    algoOrdersCount: getAlgoOrdersCount(state),
    atomicOrdersCount: getAtomicOrdersCount(state),
    positionsCount: getPositionsCount(state),
  }
}

const mapDispatchToProps = dispatch => ({
  saveState: (layoutID, componentID, state) => {
    dispatch(UIActions.saveComponentState({
      state,
      layoutID,
      componentID,
    }))
  },
  setFilteredValueWithKey: (key, value) => {
    dispatch(UIActions.setFilteredValueWithKey(key, value))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(TradingStatePanel)
