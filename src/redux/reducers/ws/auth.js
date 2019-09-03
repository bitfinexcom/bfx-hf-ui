import t from '../../constants/ws'

const getInitialState = () => {
  return {}
}

export default function (state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case t.DATA_AUTH_TOKEN: {
      const { token } = payload
      return { token }
    }

    case t.DATA_API_CREDENTIALS: {
      const { exID, apiKey, apiSecret } = payload

      return {
        ...state,
        apiKeys: {
          ...(state.apiKeys || {}),
          [exID]: {
            key: apiKey,
            secret: apiSecret,
          },
        },
      }
    }

    default: {
      return state
    }
  }
}
