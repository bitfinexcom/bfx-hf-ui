import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.NOTIFICATIONS

export default (state) => {
  return _get(state, `${path}.0.mts`, null)
}
