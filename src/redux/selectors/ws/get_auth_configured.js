import _get from 'lodash/get'
import { REDUCER_ } from '../../config'

const path = REDUCER_PATHS.WS

export default (state) => {
  return _get(state, `${path}.auth.configured`, false)
}
