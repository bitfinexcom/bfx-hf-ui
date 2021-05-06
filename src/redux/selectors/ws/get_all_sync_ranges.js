import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.WS

export default (state) => {
  const syncKeys = Object.keys(_get(state, `${path}.candles.syncs`, {}))

  return syncKeys.map((key) => {
    const [, symbol, tf] = key.split(':')
    return { symbol, tf }
  })
}
