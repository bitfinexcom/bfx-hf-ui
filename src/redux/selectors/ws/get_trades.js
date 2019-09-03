import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.WS

export default (state, exID, market) => {
  return _get(state, `${path}.trades.${exID}.${market.u}`, {})
}
