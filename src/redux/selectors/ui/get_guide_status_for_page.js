import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.UI

export default (state, page) => {
  return _get(state, `${path}.${page}_GUIDE_ACTIVE`, true)
}
