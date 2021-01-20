import { connect } from 'react-redux'

import LiveStrategyExecutor from './LiveStrategyExecutor'
import { getMarkets } from '../../redux/selectors/meta'
import { getAuthToken } from '../../redux/selectors/ws'
import WSActions from '../../redux/actions/ws'

const mapStateToProps = (state = {}) => {
  const { favoriteTradingPairs = {} } = state.ws
  const { favoritePairs = [] } = favoriteTradingPairs
  return {
    allMarkets: getMarkets(state),
    strategyContent: state.ui.content,
    favoritePairs,
    authToken: getAuthToken(state),
  }
}

const mapDispatchToProps = (dispatch) => ({
  dsExecuteLiveStrategy: () => {
    // TODO execute
  },
  savePairs: (pairs, authToken) => {
    dispatch(WSActions.send([
      'favourite_trading_pairs.save',
      authToken,
      pairs,
    ]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(LiveStrategyExecutor)
