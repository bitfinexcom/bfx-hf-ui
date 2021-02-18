import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.AOS

export default (state) => {
  return !_isEmpty(_get(state, `${path}.activeAlgoOrders`, []))
}
