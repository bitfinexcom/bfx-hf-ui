import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.WS

export default (state) => {
  const trades = _get(state, `${path}.backtest.trades`, [])
  const candles = _get(state, `${path}.backtest.candles`, [])
  return { trades, candles }
}
