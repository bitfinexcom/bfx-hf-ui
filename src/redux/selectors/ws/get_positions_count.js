import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.WS

export default (state) => {
  const positions = _get(state, `${path}.positions.bitfinex`, {})
  return Object.keys(positions).length
}
