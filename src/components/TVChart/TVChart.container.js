import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import WSDTCActions from '../../redux/actions/ws_dtc_server'
import { getActiveExchange, getActiveMarket } from '../../redux/selectors/ui'
import { getMarkets, getExchanges } from '../../redux/selectors/meta'
import {
  getAllOrders, getAllPositions, getAllCandles,
} from '../../redux/selectors/ws_dtc_server'

import TVChart from './TVChart'

const mapStateToProps = (state = {}, ownProps = {}) => ({
  activeExchange: getActiveExchange(state),
  activeMarket: getActiveMarket(state),
  atomicOrders: getAllOrders(state),
  positions: getAllPositions(state),
  exchanges: getExchanges(state),
  markets: getMarkets(state),
  candles: getAllCandles(state),
})

const mapDispatchToProps = dispatch => ({
  onChangeExchangeMarket: (exchange, market) => {
    dispatch(UIActions.setActiveExchange(exchange, market))
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
})

export default connect(mapStateToProps, mapDispatchToProps)(TVChart)
