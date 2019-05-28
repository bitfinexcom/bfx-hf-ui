import WSTypes from '../constants/ws-hf-server'

const initialState = () => ({
  status: 'offline',
  lastActivity: null,
})

export default function (state = initialState(), action = {}) {
  const { type } = action
  const lastActivity = Date.now()

  switch (type) {
    case WSTypes.CONNECT: {
      return {
        ...state,
        status: 'connecting',
      }
    }

    case WSTypes.CONNECTED: {
      return {
        ...state,
        status: 'online',
        lastActivity,
      }
    }

    case WSTypes.DISCONNECT: {
      return {
        ...state,
        status: 'disconnecting',
      }
    }

    case WSTypes.DISCONNECTED: {
      return {
        ...state,
        status: 'offline',
        lastActivity: null,
      }
    }

    case WSTypes.ERROR: {
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
