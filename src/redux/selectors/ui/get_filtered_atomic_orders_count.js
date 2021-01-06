import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.UI

export default (state) => {
  const filteredAtomics = _get(state, `${path}.filteredAtomicOrders`, [])
  return filteredAtomics.length
}
