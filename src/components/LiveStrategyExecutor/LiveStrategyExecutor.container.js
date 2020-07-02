import { connect } from 'react-redux'
import { getAuthToken } from '../../redux/selectors/ws'
import WSActions from '../../redux/actions/ws'

import LiveStrategyExecutor from './LiveStrategyExecutor'
import { getMarkets } from '../../redux/selectors/meta'

const mapStateToProps = (state = {}) => ({
  allMarkets: getMarkets(state),
  authToken: getAuthToken(state),
})

const mapDispatchToProps = (dispatch) => ({
  dsExecuteLiveStrategy: ({
    authToken, strategyID, tf, wsID,
  }) => {
    dispatch(WSActions.send([
      'strategy.start', authToken, strategyID, wsID, tf,
    ]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(LiveStrategyExecutor)
