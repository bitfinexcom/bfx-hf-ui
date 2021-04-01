import types from '../../constants/ws'

const initialState = () => ({
  [types.ALIAS_API_SERVER]: {
    status: 'offline',
    lastActivity: null,
  },
  [types.ALIAS_DATA_SERVER]: {
    status: 'offline',
    lastActivity: null,
  },
  [types.ALIAS_PUB_WS_API]: {
    status: 'offline',
    lastActivity: null,
  },
})

export default function (state = initialState(), action = {}) {
  const { type, payload = {} } = action
  const lastActivity = Date.now()

  switch (type) {
    case types.CONNECT: {
      const { alias = types.ALIAS_API_SERVER } = payload
      return {
        ...state,
        [alias]: {
          ...state[alias],
          status: 'connecting',
        },
      }
    }

    case types.CONNECTED: {
      const { alias = types.ALIAS_API_SERVER } = payload
      return {
        ...state,
        [alias]: {
          ...state[alias],
          status: 'online',
          lastActivity,
        },
      }
    }

    case types.DISCONNECT: {
      const { alias = types.ALIAS_API_SERVER } = payload
      return {
        ...state,
        [alias]: {
          ...state[alias],
          status: 'disconnecting',
        },
      }
    }

    case types.DISCONNECTED: {
      const { alias = types.ALIAS_API_SERVER } = payload
      return {
        ...state,
        [alias]: {
          ...state[alias],
          status: 'offline',
          lastActivity: null,
        },
      }
    }

    case types.SOCKET_ERROR: {
      const { alias = types.ALIAS_API_SERVER } = payload
      return {
        ...state,
        [alias]: {
          ...state[alias],
          status: 'online',
          lastActivity,
        },
      }
    }

    default: {
      return state
    }
  }
}
