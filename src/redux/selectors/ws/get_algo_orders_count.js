import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.WS

export default (state) => {
  const algoOrders = _get(state, `${path}.algoOrders.bitfinex`, [])
  return Object.keys(algoOrders).length
}
