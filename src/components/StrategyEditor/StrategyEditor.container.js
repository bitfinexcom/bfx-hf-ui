import { connect } from 'react-redux'
import WSActions from '../../redux/actions/ws'
import UIActions from '../../redux/actions/ui'
import GAActions from '../../redux/actions/google_analytics'
import { getAuthToken, getStrategies } from '../../redux/selectors/ws'
import { getActiveMarket, getStrategyId } from '../../redux/selectors/ui'

import StrategyEditor from './StrategyEditor'

const mapStateToProps = (state = {}) => ({
  activeMarket: getActiveMarket(state),
  authToken: getAuthToken(state),
  strategyId: getStrategyId(state),
  strategyContent: state.ui.content,
  strategies: getStrategies(state),
})

const mapDispatchToProps = dispatch => ({
  onSave: (authToken, strategy = {}) => {
    dispatch(WSActions.send(['strategy.save', authToken, strategy]))
  },
  onRemove: (authToken, id) => {
    dispatch(WSActions.send(['strategy.remove', authToken, id]))
    dispatch(WSActions.resetBacktestData())
    dispatch(UIActions.clearStrategies())
  },
  gaCreateStrategy: () => {
    dispatch(GAActions.createStrategy())
  },
  clearBacktestOptions: () => {
    dispatch(WSActions.resetBacktestData())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(StrategyEditor)
