import { connect } from 'react-redux'

import WSActions from '../../redux/actions/ws'
import { getAuthToken } from '../../redux/selectors/ws'
import MarketSelect from './MarketSelect'

const mapStateToProps = state => ({
  favoritePairs: state.ws.favoriteTradingPairs.favoritePairs,
  authToken: getAuthToken(state),
  currentMode: state.ui.currentMode,
})

const mapDispatchToProps = dispatch => ({
  savePairs: (pairs, authToken, currentMode) => {
    console.log(currentMode)
    dispatch(WSActions.send([
      'favourite_trading_pairs.save',
      authToken,
      pairs,
      currentMode,
    ]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(MarketSelect)
