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
    case t.DATA_STRATEGY_EXEC: {
      const { id, exec } = payload

      return {
        ...state,
        [id]: exec,
      }
    }

    case t.DATA_STRATEGY_EXECS: {
      const { execs } = payload
      return execs
    }

    case t.DEAUTH: {
      return getInitialState()
    }

    default: {
      return state
    }
  }
}
