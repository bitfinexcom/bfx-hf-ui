import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.META

export default (state, symbol) => {
  const { markets } = state[path]
  return markets[symbol]
}
