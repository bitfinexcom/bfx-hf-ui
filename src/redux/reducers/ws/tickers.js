import t from '../../constants/ws'

const getInitialState = () => {
  return {}
}

export default function (state = getInitialState(), action = {}) {
  const { type, payload = {} } = action

  switch (type) {
    case t.DATA_TICKER: {
      const { exID, channel, ticker = {} } = payload
      const [, market] = channel
      const symbol = market.r

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
