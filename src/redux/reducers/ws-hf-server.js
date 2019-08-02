import WSTypes from '../constants/ws-hf-server'
import  { NotificationManager } from 'react-notifications'
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
    case 'REST_HF_SERVER_GET_RES': {
      console.log(action)
      return { ...state }
    }
    case WSTypes.CONNECTED: {
      setTimeout(() => {
        NotificationManager.success('', 'HF socket connected!')
      }, 0)
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
      NotificationManager.error('', 'HF socket disconnected!')
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
