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
    case 'DATA.CANDLES_MESSAGE': {
      if (!_isArray(payload)) {
        return state
      }

      const [, symbol, tf, type, from, to, candles] = payload

      if (candles.length === 0) {
        return state
      }

      const startMTS = candles[0].mts
      const endMTS = _last(candles).mts
      const key = `${symbol}:${type}:${tf}`
      const data = candles.map(adapter)
      const marketData = state[key] || {}

      if (
        _isObject(marketData[startMTS]) ||
        _isObject(marketData[endMTS])
      ) {
        console.warn(`received duplicate candles: ${from} - ${to}`)
      }

      return {
        ...state,

        [key]: {
          ...marketData,
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
