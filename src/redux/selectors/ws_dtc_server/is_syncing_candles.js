import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.WS_DTC_SERVER

export default (state, exID, symbol, tf) => {
  const syncKeys = Object.keys(_get(state, `${path}.candles.syncs`, {}))

  return !!syncKeys.find((key) => {
    const [keyExID, keySym, keyTF] = key.split(':')
    return keyExID === exID && keySym === symbol && keyTF === tf
  })
}
