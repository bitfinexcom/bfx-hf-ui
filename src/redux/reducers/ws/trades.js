import t from '../../constants/ws'
import { MAX_STORED_TRADES } from '../../config'

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
    case t.DATA_TRADE: {
      const { exID, channel, trade = {} } = payload
      const [, market] = channel
      const symbol = market.uiID

      return {
        ...state,

        [exID]: {
          ...(state[exID] || {}),
          [symbol]: [
            trade,
            ...((state[exID] || {})[symbol] || []).slice(0, MAX_STORED_TRADES - 1),
          ],
        },
      }
    }

    case t.DATA_TRADES: {
      const { exID, channel, trades = [] } = payload
      const [, market] = channel
      const symbol = market.uiID
      const tradesToKeep = MAX_STORED_TRADES - trades.length

      return {
        ...state,

        [exID]: {
          ...(state[exID] || {}),
          [symbol]: [
            ...trades,
            ...((state[exID] || {})[symbol] || []).slice(0, tradesToKeep > 0 ? tradesToKeep : 0),
          ],
        },
      }
    }

    case t.PURGE_DATA_TRADES: {
      const { exID, channel = [] } = payload
      const [, market] = channel
      const symbol = market.uiID

      delete (state[exID] || {})[symbol] // eslint-disable-line

      return state
    }

    default: {
      return state
    }
  }
}
