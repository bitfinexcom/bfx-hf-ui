import _get from 'lodash/get'
import { UFX_REDUCER_PATHS } from '../../config'

const path = `ufx.${UFX_REDUCER_PATHS.TICKER}`

export default (state, market) => {
  return _get(state, `${path}.${market.restID}`, {})
}
