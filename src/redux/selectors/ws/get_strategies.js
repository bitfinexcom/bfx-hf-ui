import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.WS

export default (state) => {
  return Object.values(_get(state, `${path}.strategies`, []))
}
