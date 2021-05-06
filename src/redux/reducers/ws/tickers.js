import t from '../../constants/ws'

const getInitialState = () => {
  return {}
}

export default function (state = getInitialState(), action = {}) {
  const { type, payload = {} } = action

  switch (type) {
    case t.DATA_TICKER: {
      const { channel, ticker = {} } = payload
      const [, market] = channel
      const symbol = market.restID

      return {
        ...state,
        [symbol]: ticker,
      }
    }

    default: {
      return state
    }
  }
}
