import { connect } from 'react-redux'
import WSActions from '../../redux/actions/ws'
import { getAllCandles, getAuthToken } from '../../redux/selectors/ws'
import { getActiveMarket, getActiveExchange } from '../../redux/selectors/ui'

import StrategyEditor from './StrategyEditor'

const mapStateToProps = (state = {}) => ({
  activeExchange: getActiveExchange(state),
  activeMarket: getActiveMarket(state),
  candles: getAllCandles(state),
  authToken: getAuthToken(state),
})

const mapDispatchToProps = dispatch => ({
  onSave: (authToken, strategy = {}) => {
    dispatch(WSActions.send(['strategy.save', authToken, strategy]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(StrategyEditor)
