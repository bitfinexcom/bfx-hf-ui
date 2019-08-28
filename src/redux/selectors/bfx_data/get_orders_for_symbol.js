import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.BFX_DATA

export default (state, symbol) => {
  const orders = _get(state, `${path}.orders`, {})

  return Object
    .values(orders)
    .filter(({ symbol: oSym }) => oSym === symbol)
}
