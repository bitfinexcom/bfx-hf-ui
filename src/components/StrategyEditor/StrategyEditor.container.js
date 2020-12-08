import { connect } from 'react-redux'
import WSActions from '../../redux/actions/ws'
import GAActions from '../../redux/actions/google_analytics'
import { getAllCandles, getAuthToken } from '../../redux/selectors/ws'
import { getActiveMarket, getActiveExchange } from '../../redux/selectors/ui'

import StrategyEditor from './StrategyEditor'

const mapStateToProps = (state = {}) => {
  const { ui = {} } = state
  const { content = {} } = ui
  const { id = '' } = content || {}
  return {
    activeExchange: getActiveExchange(state),
    activeMarket: getActiveMarket(state),
    candles: getAllCandles(state),
    authToken: getAuthToken(state),
    strategyId: id,
  }
}

const mapDispatchToProps = dispatch => ({
  onSave: (authToken, strategy = {}) => {
    dispatch(WSActions.send(['strategy.save', authToken, strategy]))
  },
  onRemove: (authToken, id) => {
    dispatch(WSActions.send(['strategy.remove', authToken, id]))
  },
  gaCreateStrategy: () => {
    dispatch(GAActions.createStrategy())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(StrategyEditor)
