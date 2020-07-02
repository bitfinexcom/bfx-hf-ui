import t from '../../constants/ws'

/**
 * @returns {object} initialState
 */
const getInitialState = () => {
  return {}
}

/**
 * @param {object} state - state
 * @param {object} action - action
 * @returns {object} nextState
 */
export default function (state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case t.DATA_AUTH_CONFIGURED: {
      const { configured } = payload
      return { configured }
    }

    case t.DATA_AUTH_TOKEN: {
      const { token } = payload
      return { token }
    }

    case t.DATA_API_CREDENTIALS_CONFIGURED: {
      const { exID } = payload

      return {
        ...state,
        apiKeys: {
          ...(state.apiKeys || {}),
          [exID]: true,
        },
      }
    }

    default: {
      return state
    }
  }
}
