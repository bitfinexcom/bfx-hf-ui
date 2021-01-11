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
  strategyContent: state.ui.content,
  backtestOptions: state.ws.backtest.backtestOptions || {},
})

const mapDispatchToProps = dispatch => ({
  dsExecuteBacktest: (exchange, from, to, symbol, tf, candles, trades, strategy) => {
    dispatch(WSActions.purgeBacktestData())
    dispatch(WSActions.send([
      'exec.str', [exchange, from, to, symbol, tf, candles, trades, true, strategy],
    ]))
    dispatch(WSActions.setBacktestLoading())
  },
  setBacktestOptions: options => {
    dispatch(WSActions.setBacktestOptions(options))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Backtester)
