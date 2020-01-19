import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import WSActions from '../../redux/actions/ws'
import { getExchanges } from '../../redux/selectors/meta'
import { getComponentState, getActiveExchange } from '../../redux/selectors/ui'
import {
  getAllCandles, getAllPositions, getAllOrders, getAllSyncRanges,
} from '../../redux/selectors/ws'

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
    syncRanges: getAllSyncRanges(state),
  }
}

const mapDispatchToProps = dispatch => ({
  syncCandles: (exchange, market, tf, range) => {
    dispatch(WSActions.send([
      'get.candles', exchange, market, tf, range[0], range[1],
    ]))
  },

  addTradesRequirement: (exchange, market) => {
    dispatch(WSActions.addChannelRequirement(exchange, ['trades', market]))
  },

  addCandlesRequirement: (exchange, market, tf) => {
    dispatch(WSActions.addChannelRequirement(
      exchange, ['candles', tf, market],
    ))
  },

  removeCandlesRequirement: (exchange, market, tf) => {
    dispatch(WSActions.removeChannelRequirement(
      exchange, ['candles', tf, market],
    ))
  },

  removeTradesRequirement: (exchange, market) => {
    dispatch(WSActions.removeChannelRequirement(exchange, ['trades', market]))
  },

  saveState: (layoutID, componentID, state) => {
    dispatch(UIActions.saveComponentState({
      state,
      layoutID,
      componentID,
    }))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
