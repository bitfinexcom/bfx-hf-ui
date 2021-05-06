import _isFinite from 'lodash/isFinite'

import types from '../../constants/ws'
import getChannelRequirementKey from '../../helpers/get_channel_req_key'

const getInitialState = () => {
  return {
    channels: {},
    requirements: {},
  }
}

export default function (state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case types.CLEAR_CHANNELS: {
      return {
        ...state,
        channels: {},
      }
    }

    case types.SUBSCRIBED: {
      const { chanID, chanData } = payload

      return {
        ...state,
        channels: {
          ...state.channels,
          [chanID]: chanData,
        },
      }
    }

    case types.UNSUBSCRIBED: {
      const { chanId } = payload
      const channelsForExchange = state.channels || {}
      const { [chanId]: _, ...channels } = channelsForExchange

      return {
        ...state,
        channels,
      }
    }

    case types.ADD_CHANNEL_REQUIREMENT: {
      const { channel } = payload
      const key = getChannelRequirementKey(channel)
      const requirements = (state.requirements || {})[key] || 0

      return {
        ...state,
        requirements: {
          ...state.requirements,
          [key]: requirements + 1,
        },
      }
    }

    case types.REMOVE_CHANNEL_REQUIREMENT: {
      const { channel } = payload
      const key = getChannelRequirementKey(channel)
      const requirements = (state.requirements || {})[key]

      if (!_isFinite(requirements)) {
        return state
      }

      return {
        ...state,
        requirements: {
          ...state.requirements,
          [key]: requirements - 1,
        },
      }
    }

    default: {
      return state
    }
  }
}
