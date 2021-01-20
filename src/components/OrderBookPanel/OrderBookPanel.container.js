import { connect } from 'react-redux'

import {
  getActiveMarket, getComponentState, getActiveExchange,
} from '../../redux/selectors/ui'
import { getAuthToken } from '../../redux/selectors/ws'

import { getExchanges, getMarkets } from '../../redux/selectors/meta'
import WSActions from '../../redux/actions/ws'
import UIActions from '../../redux/actions/ui'

import OrderBookPanel from './OrderBookPanel'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps
  const activeExchange = getActiveExchange(state)
  const activeMarket = getActiveMarket(state)
  const { favoriteTradingPairs = {} } = state.ws
  const { favoritePairs = [] } = favoriteTradingPairs
  return {
    activeExchange,
    activeMarket,
    savedState: getComponentState(state, layoutID, 'book', id),
    exchanges: getExchanges(state),
    allMarkets: getMarkets(state),
    authToken: getAuthToken(state),
    favoritePairs,
  }
}

const mapDispatchToProps = dispatch => ({
  addOBRequirement: (exchange, market) => {
    dispatch(WSActions.addChannelRequirement(exchange, ['book', market]))
  },

  removeOBRequirement: (exchange, market) => {
    dispatch(WSActions.removeChannelRequirement(exchange, ['book', market]))
  },

  saveState: (layoutID, componentID, state) => {
    dispatch(UIActions.saveComponentState({
      state,
      layoutID,
      componentID,
    }))
  },

  savePairs: (pairs, authToken) => {
    dispatch(WSActions.send([
      'favourite_trading_pairs.save',
      authToken,
      pairs,
    ]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderBookPanel)
