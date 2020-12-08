import { connect } from 'react-redux'
import WSActions from '../../redux/actions/ws'
import UIActions from '../../redux/actions/ui'
import { getBacktestState, getBacktestData, getBacktestResults } from '../../redux/selectors/ws'
import { getMarkets } from '../../redux/selectors/meta'

import Backtester from './Backtester'

const mapStateToProps = (state = {}) => ({
  backtest: getBacktestState(state),
  backtestData: getBacktestData(state),
  allMarkets: getMarkets(state),
  backtestResults: getBacktestResults(state),
  strategyContent: state.ui.content,
  backtestingPage: state.ui.backtestingPage,
  dazaarCoresList: state.ws.backtest.dazaarCoresList,
})

const mapDispatchToProps = dispatch => ({
  dsExecuteBacktest: (exchange, from, to, symbol, tf, candles, trades, strategy) => {
    dispatch(WSActions.purgeBacktestData())
    dispatch(WSActions.send([
      'exec.str', [exchange, from, to, symbol, tf, candles, trades, true, strategy],
    ]))
    dispatch(WSActions.setBacktestLoading())
  },
  dsExecuteDazaar: (exchange, from, to, symbol, tf, strategy, ids, opts) => {
    dispatch(WSActions.purgeBacktestData())
    dispatch(WSActions.send([
      'exec.dazaar', [exchange, from, to, symbol, ids, tf, opts, strategy],
    ]))
    dispatch(WSActions.setBacktestLoading())
  },
  setBacktestingPage: (page) => {
    dispatch(UIActions.setBacktestingPage(page))
  },
  getHyperCores: () => {
    dispatch(WSActions.send(['dazaar.ls', ['ls']]))
  },
  removeCores: (cores) => {
    dispatch(WSActions.send(['dazaar.rm', ['rm', { dirs: cores }]]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Backtester)
