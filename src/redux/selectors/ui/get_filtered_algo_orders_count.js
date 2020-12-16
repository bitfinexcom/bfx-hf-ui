import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.UI

export default (state) => {
  const filteredAO = _get(state, `${path}.filteredAO`, [])
  return filteredAO.length
}
