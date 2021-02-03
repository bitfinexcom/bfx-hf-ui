import { connect } from 'react-redux'

import WSActions from '../../redux/actions/ws'
import UIActions from '../../redux/actions/ui'
import { getActiveMarket, getActiveExchange } from '../../redux/selectors/ui'
import { getTicker, getAuthToken } from '../../redux/selectors/ws'
import { getExchanges, getMarkets } from '../../redux/selectors/meta'

import ExchangeInfoBar from './ExchangeInfoBar'

const mapStateToProps = (state = {}) => {
  const activeExchange = getActiveExchange(state)
  const activeMarket = getActiveMarket(state)
  const { ui = {}, ws = {} } = state
  const { isNotificationsOpened, isPaperTrading, isTradingModeModalVisible } = ui
  const { favoriteTradingPairs = {} } = ws
  const { favoritePairs = [] } = favoriteTradingPairs
  return {
    activeExchange,
    activeMarket,
    ticker: getTicker(state, activeExchange, activeMarket),
    exchanges: getExchanges(state),
    markets: getMarkets(state),
    isNotificationsOpened,
    authToken: getAuthToken(state),
    favoritePairs,
    isPaperTrading,
    isTradingModeModalVisible,
  }
}

const mapDispatchToProps = dispatch => ({
  addTickerRequirement: (exchange, market) => {
    dispatch(WSActions.addChannelRequirement(exchange, ['ticker', market]))
  },

  onChangeMarket: (exchange, market, prevMarket) => {
    dispatch(WSActions.removeChannelRequirement(exchange, ['ticker', prevMarket]))
    dispatch(UIActions.setActiveMarket(market))
    dispatch(WSActions.addChannelRequirement(exchange, ['ticker', market]))
  },

  onChangeExchange: (prevExchange, exchange, prevMarket, market) => {
    dispatch(WSActions.removeChannelRequirement(prevExchange, ['ticker', prevMarket]))
    dispatch(UIActions.setActiveExchange(exchange, market))
    dispatch(WSActions.addChannelRequirement(exchange, ['ticker', market]))
  },

  openNotifications: () => {
    dispatch(UIActions.openNotifcationPanel())
  },

  openTradingModeModal: () => {
    dispatch(UIActions.changeTradingModeModalState(true))
  },

  savePairs: (pairs, authToken) => {
    dispatch(WSActions.send([
      'favourite_trading_pairs.save',
      authToken,
      pairs,
    ]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeInfoBar)
