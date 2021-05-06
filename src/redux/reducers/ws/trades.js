import t from '../../constants/ws'
import { MAX_STORED_TRADES } from '../../config'

const getInitialState = () => {
  return {}
}

export default function (state = getInitialState(), action = {}) {
  const { type, payload = {} } = action

  switch (type) {
    case t.DATA_TRADES: {
      const { channel, trades = [] } = payload
      const [, market] = channel
      const symbol = market.uiID || ''
      const currentTrades = state && (state[symbol] || [])
      const totalTrades = currentTrades.length + trades.length
      if (totalTrades >= MAX_STORED_TRADES) {
        currentTrades.splice(-(totalTrades - MAX_STORED_TRADES))
      }
      return {
        ...state,
        [symbol]: [
          ...trades,
          ...currentTrades,
        ],
      }
    }

    case t.PURGE_DATA_TRADES: {
      const { channel = [] } = payload
      const [, market] = channel
      const symbol = market.uiID

      delete (state || {})[symbol] // eslint-disable-line

      return state
    }

    default: {
      return state
    }
  }
}
