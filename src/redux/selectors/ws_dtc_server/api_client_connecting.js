import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.WS_DTC_SERVER

export default (state, exID) => {
  return _get(state, `${path}.apiClients.${exID}`, 0) === 1
}
