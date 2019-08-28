import types from '../../constants/bfx_data'
import { notificationAdapter } from '../../adapters/bfx'

function getInitialState() {
  return []
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case types.NOTIFICATION: {
      const { notification = [] } = payload

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
