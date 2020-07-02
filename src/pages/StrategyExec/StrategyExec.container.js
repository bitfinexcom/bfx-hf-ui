import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import StrategyExec from './StrategyExec'

import WSActions from '../../redux/actions/ws'
import {
  getAuthToken, getStrategies, getStrategyExecs,
} from '../../redux/selectors/ws'

const STRATEGY_EDITOR_PAGE_ROUTE = '/strategy-editor'

const mapStateToProps = (state = {}) => ({
  strategies: getStrategies(state),
  execs: getStrategyExecs(state),
  authToken: getAuthToken(state),
})

const mapDispatchToProps = dispatch => ({
  syncStrategyExecs: (authToken) => {
    dispatch(WSActions.send(['strategy.exec.get', authToken]))
  },

  navigateToStrategyEditorPage: () => {
    dispatch(push(STRATEGY_EDITOR_PAGE_ROUTE))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(StrategyExec)
