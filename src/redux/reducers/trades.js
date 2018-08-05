import _keyBy from 'lodash/keyBy'
import _isArray from 'lodash/isArray'
import adapter from '../adapters/trades'

function getInitialState() {
  return {}
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case 'TRADES_MESSAGE': {
      if (!_isArray(payload)) {
        return state
      }

      const [, symbol, type, trades] = payload
      const key = `${symbol}:${type}`
      const data = trades.map(adapter)

      return {
        ...state,
        [key]: {
          ...(state[key] || {}),
          ...(_keyBy(data, t => t.id + '')),
        }
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
