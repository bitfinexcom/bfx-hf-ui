import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.UI

export default (state, id) => {
  return _get(state, `${path}.layouts.${id}`)
}
