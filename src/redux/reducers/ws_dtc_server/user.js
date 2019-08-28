import t from '../../constants/ws_dtc_server'

const AUTH_TOKEN_COOKIE_MAX_AGE = 7 * 24 * 60 * 60
const getInitialState = () => {
  return {}
}

export default function (state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case t.AUTH_SUCCESS: {
      const {
        userID, username, userEmail, authToken, apiKeys, subscription,
        cancelSubscriptionURL, updateBillingURL,
      } = payload

      if (authToken) {
        document.cookie = `authToken=${authToken};max-age=${AUTH_TOKEN_COOKIE_MAX_AGE}`
      }

      return {
        id: userID,
        email: userEmail,
        username,
        apiKeys,
        subscription,
        cancelSubscriptionURL,
        updateBillingURL,
      }
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
          }
        }
      }
    }

    case t.DEAUTH: {
      document.cookie = 'authToken=;max-age=0'
      return {}
    }

    default: {
      return state
    }
  }
}
