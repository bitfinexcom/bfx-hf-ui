import { connect } from 'react-redux'

import ChartPanel from './ChartPanel'
import UIActions from '../../redux/actions/ui'
import WSActions from '../../redux/actions/ws'
import { getAuthToken } from '../../redux/selectors/ws'
import { getExchanges, getMarkets } from '../../redux/selectors/meta'
import { getActiveMarket, getComponentState, getActiveExchange } from '../../redux/selectors/ui'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps
  const activeExchange = getActiveExchange(state)
  const { favoriteTradingPairs = {} } = state.ws
  const { favoritePairs = [] } = favoriteTradingPairs
  return {
    activeExchange,
    savedState: getComponentState(state, layoutID, 'trades', id),
    activeMarket: getActiveMarket(state),
    exchanges: getExchanges(state),
    allMarkets: getMarkets(state),
    authToken: getAuthToken(state),
    favoritePairs,
  }
}

const mapDispatchToProps = dispatch => ({
  addTradesRequirement: (exchange, market) => {
    dispatch(WSActions.addChannelRequirement(exchange, ['trades', market]))
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

export default connect(mapStateToProps, mapDispatchToProps)(ChartPanel)
