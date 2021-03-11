import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import Debug from 'debug'

import OrderForm from './OrderForm'
import UIActions from '../../redux/actions/ui'
import WSActions from '../../redux/actions/ws'
import GAActions from '../../redux/actions/google_analytics'
import { getExchanges, getMarkets } from '../../redux/selectors/meta'
import {
  getAPIClientStates, getAuthToken, getAPICredentials,
} from '../../redux/selectors/ws'
import {
  getComponentState, getActiveExchange, getActiveMarket, getCurrentMode,
} from '../../redux/selectors/ui'

const debug = Debug('hfui:c:order-form')

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps
  const { ws = {} } = state
  const { favoriteTradingPairs = {} } = ws
  const { favoritePairs = [] } = favoriteTradingPairs
  return {
    activeExchange: getActiveExchange(state),
    activeMarket: getActiveMarket(state),
    exchanges: getExchanges(state),
    apiClientStates: getAPIClientStates(state),
    allMarkets: getMarkets(state),
    savedState: getComponentState(state, layoutID, 'orderform', id),
    authToken: getAuthToken(state),
    apiCredentials: getAPICredentials(state),
    favoritePairs,
    mode: getCurrentMode(state),
  }
}

const mapDispatchToProps = dispatch => ({
  navigate: (route) => {
    dispatch(push(route))
  },

  saveState: (layoutID, componentID, state) => {
    dispatch(UIActions.saveComponentState({
      state,
      layoutID,
      componentID,
    }))
  },

  submitOrder: ({ authToken, exID, packet }) => {
    debug('submitting order %j', packet)

    dispatch(WSActions.send(['order.submit', authToken, exID, {
      symbol: packet.symbol[exID === 'bitfinex' ? 'w' : 'r'],
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
    authToken, exID, id, market, context, data,
  }) => {
    debug('submitting algo order %s on %s [%s]', id, market.uiID, context)

    dispatch(WSActions.send(['algo_order.submit', authToken, exID, id, {
      ...data,
      _symbol: exID === 'bitfinex' ? market.wsID : market.restID,
      _margin: context === 'm',
      _futures: context === 'f',
    }]))
  },

  submitAPIKeys: ({
    exID, authToken, apiKey, apiSecret,
  }, mode) => {
    dispatch(WSActions.send([
      'api_credentials.save',
      authToken,
      exID,
      apiKey,
      apiSecret,
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

  onChangeMarket: (exchange, market, prevMarket) => {
    dispatch(WSActions.removeChannelRequirement(exchange, ['ticker', prevMarket]))
    dispatch(UIActions.setActiveMarket(market))
    dispatch(WSActions.addChannelRequirement(exchange, ['ticker', market]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
