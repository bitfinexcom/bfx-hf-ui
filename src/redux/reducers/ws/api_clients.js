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
const reducer = (state = getInitialState(), action = {}) => {
  const { type, payload = {} } = action

  switch (type) {
    case t.DATA_CLIENT_STATUS_UPDATE: {
      const { exID, status } = payload

      return {
        ...state,
        [exID]: status,
      }
    }

    case t.DEAUTH: {
      return getInitialState()
    }

    default: {
      return state
    }
  }
}

export default reducer
