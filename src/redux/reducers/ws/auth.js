import t from '../../constants/ws'

const getInitialState = () => {
  return {}
}

export default function (state = getInitialState(), action = {}) {
  const { type, payload = [] } = action
  switch (type) {
    case t.DATA_AUTH_CONFIGURED: {
      const { configured } = payload
      return {
        ...state,
        configured,
      }
    }

    case t.DATA_AUTH_TOKEN: {
      const { token } = payload
      return {
        ...state,
        token,
      }
    }

    case t.AUTH_API_FAILED: {
      const { status } = payload
      return {
        ...state,
        isWrongAPIKeys: status,
      }
    }

    case t.AUTH_API_VALIDATING: {
      const { status } = payload
      return {
        ...state,
        isValidatingAPIKeys: status,
      }
    }

    case t.DATA_API_CREDENTIALS_CONFIGURED: {
      return {
        ...state,
        apiKeys: {
          ...(state.apiKeys || {}),
          configured: true,
        },
      }
    }

    default: {
      return state
    }
  }
}
