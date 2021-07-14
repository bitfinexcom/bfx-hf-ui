import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.UI

const filteredAtomicOrders = (state) => {
  const filteredAtomics = _get(state, `${path}.filteredAtomicOrders`, [])
  return filteredAtomics
}

export default filteredAtomicOrders
