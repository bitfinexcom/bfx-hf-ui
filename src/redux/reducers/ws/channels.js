import _isFinite from 'lodash/isFinite'

import types from '../../constants/ws'
import getChannelRequirementKey from '../../helpers/get_channel_req_key'

const getInitialState = () => {
  return {
    channels: {},
    requirements: {},
  }
}

/**
 * @param {object} state - state
 * @param {object} action - action
 * @returns {object} nextState
 */
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
      const { exID, chanID, chanData } = payload

      return {
        ...state,
        channels: {
          ...state.channels,

          [exID]: {
            ...(state.channels[exID] || {}),
            [`${chanID}`]: chanData,
          },
        },
      }
    }

    case types.UNSUBSCRIBED: {
      const { exID, chanId } = payload
      const channelsForExchange = state.channels[exID] || {}
      const { [chanId]: _, ...remainingChannels } = channelsForExchange

      return {
        ...state,
        channels: {
          ...state.channels,
          [exID]: remainingChannels,
        },
      }
    }

    case types.ADD_CHANNEL_REQUIREMENT: {
      const { exID, channel } = payload
      const key = getChannelRequirementKey(channel)
      const requirements = (state.requirements[exID] || {})[key] || 0

      return {
        ...state,
        requirements: {
          ...state.requirements,

          [exID]: {
            ...(state.requirements[exID] || {}),
            [key]: requirements + 1,
          },
        },
      }
    }

    case types.REMOVE_CHANNEL_REQUIREMENT: {
      const { exID, channel } = payload
      const key = getChannelRequirementKey(channel)
      const requirements = (state.requirements[exID] || {})[key]

      if (!_isFinite(requirements)) {
        return state
      }

      return {
        ...state,
        requirements: {
          ...state.requirements,

          [exID]: {
            ...(state.requirements[exID] || {}),
            [key]: requirements - 1,
          },
        },
      }
    }

    default: {
      return state
    }
  }
}
