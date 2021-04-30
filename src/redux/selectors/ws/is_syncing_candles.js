import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.WS

export default (state, symbol, tf) => {
  const syncKeys = Object.keys(_get(state, `${path}.candles.syncs`, {}))

  return !!syncKeys.find((key) => {
    const [, keySym, keyTF] = key.split(':')
    return keySym === symbol && keyTF === tf
  })
}
