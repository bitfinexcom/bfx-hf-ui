import { connect } from 'react-redux'

import WSActions from '../../redux/actions/ws'
import { getBacktestState, getBacktestData } from '../../redux/selectors/ws'
import { getMarkets } from '../../redux/selectors/meta'

import Backtester from './Backtester'

const mapStateToProps = (state = {}) => ({
  backtest: getBacktestState(state),
  backtestData: getBacktestData(state),
  allMarkets: getMarkets(state),
})

const mapDispatchToProps = dispatch => ({
  dsExecuteBacktest: (exchange, from, to, symbol, tf) => {
    dispatch(WSActions.send([
      'exec.bt', [exchange, from, to, symbol, tf, true, true, true],
    ]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Backtester)
