import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'
import getChannelRequirementKey from '../../helpers/get_channel_req_key'

const path = REDUCER_PATHS.WS_DTC_SERVER

export default (state, exID, channel = []) => {
  const key = getChannelRequirementKey(channel)
  return _get(state, `${path}.channelData.requirements.${exID}.${key}`, 0)
}
