import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.WS_DTC_SERVER

export default (state, { exID, symbol, tf }) => {
  return _get(state, `${path}.candles.lastUpdate`, {})[`${exID}:${symbol}:${tf}`] || 0
}
