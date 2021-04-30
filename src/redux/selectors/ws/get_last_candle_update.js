import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.WS

export default (state, { symbol, tf }) => {
  return _get(state, `${path}.candles.lastUpdate`, {})[`${symbol}:${tf}`] || 0
}
