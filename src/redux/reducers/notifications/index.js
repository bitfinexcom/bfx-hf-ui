import WSTypes from '../../constants/ws'
import UITypes from '../../constants/ui'
import { notificationAdapter } from '../../adapters/ws'

function getInitialState() {
  return []
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case UITypes.DATA_NOTIFICATION:
    case WSTypes.DATA_NOTIFICATION: {
      const { notification = [] } = payload
      console.log(notification)
      return [
        notificationAdapter(notification),
        ...state,
      ]
    }

    default: {
      return state
    }
  }
}

export default reducer
