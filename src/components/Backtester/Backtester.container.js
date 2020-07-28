import { connect } from 'react-redux'

import WSActions from '../../redux/actions/ws'
import { getBacktestState, getBacktestData, getBacktestResults } from '../../redux/selectors/ws'
import { getMarkets } from '../../redux/selectors/meta'

import Backtester from './Backtester'

const mapStateToProps = (state = {}) => ({
  backtest: getBacktestState(state),
  backtestData: getBacktestData(state),
  allMarkets: getMarkets(state),
  backtestResults: getBacktestResults(state),
})

const mapDispatchToProps = dispatch => ({
  dsExecuteBacktest: (exchange, from, to, symbol, tf, strategy) => {
    dispatch(WSActions.purgeBacktestData())
    dispatch(WSActions.send([
      'exec.str', [exchange, from, to, symbol, tf, true, true, true, strategy],
    ]))
    dispatch(WSActions.setBacktestLoading())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Backtester)
