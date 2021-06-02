import _find from 'lodash/find'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.META

export default (state, symbol) => {
  const { markets } = state[path]
  return _find(markets, market => market.wsID === symbol)
}
