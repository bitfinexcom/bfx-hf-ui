import { connect } from 'react-redux'
import _isEqual from 'lodash/isEqual'

import WSActions from '../../redux/actions/ws'
import UIActions from '../../redux/actions/ui'
import { getActiveMarket, getCurrentMode } from '../../redux/selectors/ui'
import {
  getTicker, getAuthToken, getTickersArray, getFavoritePairsObject,
} from '../../redux/selectors/ws'
import { getMarkets } from '../../redux/selectors/meta'

import ExchangeInfoBar from './ExchangeInfoBar'

const mapStateToProps = (state = {}) => {
  const activeMarket = getActiveMarket(state)

  return {
    activeMarket,
    activeMarketTicker: getTicker(state, activeMarket),
    allTickersArray: getTickersArray(state),
    favoritePairs: getFavoritePairsObject(state),
    markets: getMarkets(state),
    authToken: getAuthToken(state),
    currentMode: getCurrentMode(state),
  }
}

const mapDispatchToProps = (dispatch) => ({
  onChangeMarket: (market, prevMarket) => {
    if (_isEqual(market, prevMarket)) {
      return
    }
    dispatch(UIActions.setActiveMarket(market))
  },

  subscribeAllMarkets: (markets) => markets.forEach((market) => {
    dispatch(WSActions.addChannelRequirement(['ticker', market]))
  }),
  updateFavorites: (authToken, newArray, currentMode) => {
    dispatch(WSActions.send([
      'favourite_trading_pairs.save',
      authToken,
      newArray,
      currentMode,
    ]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeInfoBar)
