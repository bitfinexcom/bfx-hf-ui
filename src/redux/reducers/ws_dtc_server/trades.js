import t from '../../constants/ws_dtc_server'

const getInitialState = () => {
  return {}
}

export default function (state = getInitialState(), action = {}) {
  const { type, payload = {} } = action

  switch (type) {
    case t.DATA_TRADE: {
      const { exID, channel, trade = {} } = payload
      const [, market] = channel
      const symbol = market.u

      return {
        ...state,

        [exID]: {
          ...(state[exID] || {}),
          [symbol]: [
            trade,
            ...((state[exID] || {})[symbol] || []),
          ],
        },
      }
    }

    case t.DATA_TRADES: {
      const { exID, channel, trades = [] } = payload
      const [, market] = channel
      const symbol = market.u

      return {
        ...state,

        [exID]: {
          ...(state[exID] || {}),
          [symbol]: [
            ...trades,
            ...((state[exID] || {})[symbol] || []),
          ],
        },
      }
    }

    default: {
      return state
    }
  }
}
