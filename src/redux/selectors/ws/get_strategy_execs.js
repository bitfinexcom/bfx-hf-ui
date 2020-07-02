import _get from 'lodash/get'
import _values from 'lodash/values'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.WS

export default (state) => {
  return _values(_get(state, `${path}.strategy_execs`, {}))
}
