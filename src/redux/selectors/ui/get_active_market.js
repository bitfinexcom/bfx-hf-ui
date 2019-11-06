import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.UI

export default (state) => {
  return _get(state, `${path}.activeMarket`, {
    r: 'BTCUSDT',
    w: 'BTCUSDT',
    b: 'BTC',
    q: 'USDT',
  })
}
