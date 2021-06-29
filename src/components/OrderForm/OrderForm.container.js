import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import Debug from 'debug'
import _values from 'lodash/values'
import _map from 'lodash/map'

import OrderForm from './OrderForm'
import UIActions from '../../redux/actions/ui'
import WSActions from '../../redux/actions/ws'
import GAActions from '../../redux/actions/google_analytics'
import { getMarkets } from '../../redux/selectors/meta'
import {
  getAPIClientState, getAuthToken, getAPICredentials,
} from '../../redux/selectors/ws'
import {
  getComponentState, getActiveMarket, getCurrentMode, getIsPaperTrading, getIsOrderExecuting,
} from '../../redux/selectors/ui'
import rawOrders from '../../orders'

const orders = _map(_values(rawOrders), uiDef => uiDef())
const debug = Debug('hfui:c:order-form')

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps
  const { ws = {} } = state
  const { favoriteTradingPairs = {} } = ws
  const { favoritePairs = [] } = favoriteTradingPairs
  return {
    activeMarket: getActiveMarket(state),
    apiClientState: getAPIClientState(state),
    markets: getMarkets(state),
    savedState: getComponentState(state, layoutID, 'orderform', id),
    authToken: getAuthToken(state),
    apiCredentials: getAPICredentials(state),
    favoritePairs,
    mode: getCurrentMode(state),
    isPaperTrading: getIsPaperTrading(state),
    isOrderExecuting: getIsOrderExecuting(state),
    orders,
  }
}

const mapDispatchToProps = dispatch => ({
  navigate: (route) => {
    dispatch(push(route))
  },

  setIsOrderExecuting: (executing) => {
    dispatch(UIActions.setIsOrderExecuting(executing))
  },

  saveState: (componentID, state) => {
    dispatch(UIActions.saveComponentState({
      state,
      componentID,
    }))
  },

  submitOrder: ({ authToken, packet }) => {
    debug('submitting order %j', packet)

    dispatch(WSActions.send(['order.submit', authToken, 'bitfinex', {
      symbol: packet.symbol.w,
      ...packet,
    }]))
  },
  gaSubmitOrder: () => {
    dispatch(GAActions.submitAtomicOrder())
  },
  gaSubmitAO: () => {
    dispatch(GAActions.submitAO())
  },
  submitAlgoOrder: ({
    authToken, id, market, context, data,
  }) => {
    debug('submitting algo order %s on %s [%s]', id, market.uiID, context)

    dispatch(WSActions.send(['algo_order.submit', authToken, 'bitfinex', id, {
      ...data,
      _symbol: market.wsID,
      _margin: context === 'm',
      _futures: context === 'f',
    }]))
  },

  submitAPIKeys: ({
    authToken, apiKey, apiSecret,
  }, mode) => {
    dispatch(WSActions.send([
      'api_credentials.save',
      authToken,
      apiKey,
      apiSecret,
      mode,
      mode,
    ]))
  },

  savePairs: (pairs, authToken, mode) => {
    dispatch(WSActions.send([
      'favourite_trading_pairs.save',
      authToken,
      pairs,
      mode,
    ]))
  },

  onChangeMarket: (market, prevMarket) => {
    dispatch(WSActions.removeChannelRequirement(['ticker', prevMarket]))
    dispatch(UIActions.setActiveMarket(market))
    dispatch(WSActions.addChannelRequirement(['ticker', market]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
