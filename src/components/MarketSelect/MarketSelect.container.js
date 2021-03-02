import { connect } from 'react-redux'

import WSActions from '../../redux/actions/ws'
import { getAuthToken, getFavoritePairs } from '../../redux/selectors/ws'
import { getCurrentMode } from '../../redux/selectors/ui'
import MarketSelect from './MarketSelect'

const mapStateToProps = state => ({
  favoritePairs: getFavoritePairs(state),
  authToken: getAuthToken(state),
  currentMode: getCurrentMode(state),
})

const mapDispatchToProps = dispatch => ({
  savePairs: (pairs, authToken, currentMode) => {
    dispatch(WSActions.send([
      'favourite_trading_pairs.save',
      authToken,
      pairs,
      currentMode,
    ]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(MarketSelect)
