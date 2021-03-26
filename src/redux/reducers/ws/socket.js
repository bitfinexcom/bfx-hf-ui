import types from '../../constants/ws'

const initialState = () => ({
  status: {}, // { alias: status, ... }
  lastActivity: {}, // { alias: lastActivity }
})

export default function (state = initialState(), action = {}) {
  const { type } = action
  const lastActivity = Date.now()

  switch (type) {
    case types.CONNECT: {
      return {
        ...state,
        status: 'connecting',
      }
    }

    case types.CONNECTED: {
      return {
        ...state,
        status: 'online',
        lastActivity,
      }
    }

    case types.DISCONNECT: {
      return {
        ...state,
        status: 'disconnecting',
      }
    }

    case types.DISCONNECTED: {
      return {
        ...state,
        status: 'offline',
        lastActivity: null,
      }
    }

    case types.SOCKET_ERROR: {
      return {
        ...state,
        status: 'online',
        lastActivity,
      }
    }

    default: {
      return state
    }
  }
}
