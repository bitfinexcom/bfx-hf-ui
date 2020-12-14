import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.WS

export default (state) => {
  const orders = _get(state, `${path}.orders.bitfinex`, {})
  return Object.keys(orders).length
}
