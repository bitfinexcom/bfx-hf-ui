import types from '../../constants/ws'

/**
 * @returns {object} initialState
 */
const initialState = () => ({
  status: 'offline',
  lastActivity: null,
})

/**
 * @param {object} state - state
 * @param {object} action - action
 * @returns {object} nextState
 */
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
