import { connect } from 'react-redux'
import _isEqual from 'lodash/isEqual'

import WSActions from '../../redux/actions/ws'
import UIActions from '../../redux/actions/ui'
import { getActiveMarket } from '../../redux/selectors/ui'
import { getTicker, getAuthToken, getTickersArray } from '../../redux/selectors/ws'
import { getMarkets } from '../../redux/selectors/meta'

import ExchangeInfoBar from './ExchangeInfoBar'

const mapStateToProps = (state = {}) => {
  const activeMarket = getActiveMarket(state)
  const { ui = {} } = state
  const {
    isNotificationsOpened,
  } = ui

  return {
    activeMarket,
    activeMarketTicker: getTicker(state, activeMarket),
    allTickersArray: getTickersArray(state),
    markets: getMarkets(state),
    isNotificationsOpened,
    authToken: getAuthToken(state),
  }
}

const mapDispatchToProps = dispatch => ({
  onChangeMarket: (market, prevMarket) => {
    if (_isEqual(market, prevMarket)) {
      return
    }
    dispatch(UIActions.setActiveMarket(market))
  },

  subscribeAllMarkets: (markets) => markets.forEach((market) => {
    dispatch(WSActions.addChannelRequirement(['ticker', market]))
  }),

  openNotifications: () => {
    dispatch(UIActions.openNotifcationPanel())
  },
  onRefillClick: () => {
    dispatch(UIActions.changeReffilBalanceModalState(true))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeInfoBar)
