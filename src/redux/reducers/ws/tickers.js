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
  const { type, payload = {} } = action

  switch (type) {
    case t.DATA_TICKER: {
      const { exID, channel, ticker = {} } = payload
      const [, market] = channel
      const symbol = market.restID

      return {
        ...state,

        [exID]: {
          ...(state[exID] || {}),
          [symbol]: ticker,
        },
      }
    }

    default: {
      return state
    }
  }
}
