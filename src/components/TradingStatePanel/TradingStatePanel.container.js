import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import {
  getAlgoOrders, getAllOrders, getAllPositions, getAllBalances,
} from '../../redux/selectors/ws_dtc_server'

import {
  getComponentState, getActiveExchange, getActiveMarket,
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
})

export default connect(mapStateToProps, mapDispatchToProps)(TradingStatePanel)
