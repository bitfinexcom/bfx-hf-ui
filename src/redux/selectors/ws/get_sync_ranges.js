import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.WS

export default (state, symbol, tf) => {
  const syncKeys = Object.keys(_get(state, `${path}.candles.syncs`, {}))
  const syncs = syncKeys.filter((key) => {
    const [, keySym, keyTF] = key.split(':')
    return keySym === symbol && keyTF === tf
  })

  return syncs.map((syncKey) => {
    const tokens = syncKey.split(':')
    const [,, start, end] = tokens

    return {
      start: new Date(+start),
      end: new Date(+end),
    }
  })
}
