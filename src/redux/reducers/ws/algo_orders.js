import _keyBy from 'lodash/keyBy'

import types from '../../constants/ws'

const getInitialState = () => {
  return {}
}

export default (state = getInitialState(), action = {}) => {
  const { type, payload = [] } = action

  switch (type) {
    case types.DATA_ALGO_ORDERS: {
      const { exID, aos: aosPacket } = payload
      const aos = aosPacket.map(([gid, name, label, args]) => ({
        gid, name, label, args, exID,
      }))

      // TODO: Transformer

      return {
        ...state,
        [exID]: _keyBy(aos, ao => `${ao.gid}`),
      }
    }

    case types.DATA_ALGO_ORDER: {
      const { exID, ao } = payload

      ao.exID = exID

      return {
        ...state,

        [exID]: {
          ...(state[exID] || {}),
          ..._keyBy([ao], o => `${o.gid}`),
        },
      }
    }

    case types.DATA_ALGO_ORDER_STOPPED: {
      const { exID, gid } = payload
      const { ...aos } = state[exID] || {}

      delete aos[`${gid}`]

      return {
        ...state,
        [exID]: aos,
      }
    }

    case types.DEAUTH: {
      return getInitialState()
    }

    default: {
      return state
    }
  }
}
