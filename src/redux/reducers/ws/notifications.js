import types from '../../constants/ws'
import { notificationAdapter } from '../../adapters/ws'

/**
 * @returns {object} initialState
 */
function getInitialState() {
  return []
}

/**
 * @param {object} state - state
 * @param {object} action - action
 * @returns {object} nextState
 */
function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case types.DATA_NOTIFICATION: {
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
