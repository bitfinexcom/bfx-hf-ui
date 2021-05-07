import { connect } from 'react-redux'

import LiveStrategyExecutor from './LiveStrategyExecutor'
import { getMarkets } from '../../redux/selectors/meta'
import { getAuthToken } from '../../redux/selectors/ws'

const mapStateToProps = (state = {}) => ({
  markets: getMarkets(state),
  strategyContent: state.ui.content,
  authToken: getAuthToken(state),
})

const mapDispatchToProps = () => ({
  dsExecuteLiveStrategy: () => {
    // TODO execute
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(LiveStrategyExecutor)
