import { connect } from 'react-redux'

import WSActions from '../../redux/actions/ws'
import { getBacktestState, getBacktestData } from '../../redux/selectors/ws'
import Backtester from './Backtester'

const mapStateToProps = (state = {}) => ({
  backtest: getBacktestState(state),
  backtestData: getBacktestData(state),
})

const mapDispatchToProps = dispatch => ({
  dsExecuteBacktest: (exchange, from, to, symbol, tf) => {
    // ['exec.bt', [exchange, from, to, symbol, tf, candles, trades, sync]]
    dispatch(WSActions.send([
      'exec.bt', [exchange, new Date(from).getTime(), new Date(to).getTime(), symbol, tf, true, true, true],
    ]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Backtester)
