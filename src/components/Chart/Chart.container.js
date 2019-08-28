import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import WSDTCActions from '../../redux/actions/ws_dtc_server'
import { getExchanges } from '../../redux/selectors/meta'
import { getComponentState, getActiveExchange } from '../../redux/selectors/ui'
import {
  getAllCandles, getAllPositions, getUser, getAllOrders,
} from '../../redux/selectors/ws_dtc_server'

import Chart from './Chart'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps
  const activeExchange = ownProps.activeExchange || getActiveExchange(state)

  return {
    activeExchange,
    reduxState: state, // needed for internal isSyncingCandles() call
    exchanges: getExchanges(state),
    savedState: getComponentState(state, layoutID, 'chart', id),
    candleData: getAllCandles(state),
    orders: getAllOrders(state),
    positions: getAllPositions(state),
    user: getUser(state),
  }
}

const mapDispatchToProps = dispatch => ({
  syncCandles: (exchange, market, tf, range) => {
    dispatch(WSDTCActions.send([
      'get.candles', exchange, market, tf, range[0], range[1],
    ]))
  },

  addTradesRequirement: (exchange, market) => {
    dispatch(WSDTCActions.addChannelRequirement(exchange, ['trades', market]))
  },

  addCandlesRequirement: (exchange, market, tf) => {
    dispatch(WSDTCActions.addChannelRequirement(
      exchange, ['candles', tf, market]
    ))
  },

  removeCandlesRequirement: (exchange, market, tf) => {
    dispatch(WSDTCActions.removeChannelRequirement(
      exchange, ['candles', tf, market]
    ))
  },

  removeTradesRequirement: (exchange, market) => {
    dispatch(WSDTCActions.removeChannelRequirement(exchange, ['trades', market]))
  },

  saveState: (layoutID, componentID, state) => {
    dispatch(UIActions.saveComponentState({
      state,
      layoutID,
      componentID,
    }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
