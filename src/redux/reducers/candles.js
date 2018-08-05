import _isObject from 'lodash/isObject'
import _isArray from 'lodash/isArray'
import _last from 'lodash/last'
import _keyBy from 'lodash/keyBy'
import adapter from '../adapters/candles'

function getInitialState() {
  return {}
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case 'CANDLES_MESSAGE': {
      if (!_isArray(payload)) {
        return state
      }

      const [, symbol, tf, type, candles] = payload
      const from = candles[0].mts
      const to = _last(candles).mts
      const key = `${symbol}:${type}:${tf}`
      const data = candles.map(adapter)

      if (_isObject(state[key][from]) || _isObject(state[key][to])) {
        console.warn(`received duplicate candles: ${from} - ${to}`)
      }

      return {
        ...state,

        [key]: {
          ...(state[key] || {}),
          ...(_keyBy(data, c => c.mts + '')),
        },
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
