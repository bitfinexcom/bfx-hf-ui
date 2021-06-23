import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.UI

const DEFAULT_ACTIVE_MARKET = {
  r: 'BTCUSDT',
  w: 'BTCUSDT',
  b: 'BTC',
  q: 'USDT',
}

export default (state) => {
  return _get(state, `${path}.activeMarket`, DEFAULT_ACTIVE_MARKET)
}
