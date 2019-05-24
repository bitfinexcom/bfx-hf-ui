import _isObject from 'lodash/isObject'
import _isArray from 'lodash/isArray'
import _last from 'lodash/last'
import _keyBy from 'lodash/keyBy'
import adapter from '../adapters/candles'

const syncKey = (msg = []) => {
  const [, symbol, tf, from, to] = msg
  return `${symbol}:${tf}:${from}:${to}`
}

function getInitialState() {
  return {
    syncs: {},
  }
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  if (!_isArray(payload)) {
    return state
  }

  switch (type) {
    case 'HF_DS_DATA.SYNC.START_MESSAGE': {
      const k = syncKey(payload)

      return {
        ...state,
        syncs: {
          ...state.syncs,
          [k]: true,
        },
      }
    }

    case 'HF_DS_DATA.SYNC.END_MESSAGE': {
      const k = syncKey(payload)
      const syncs = { ...state.syncs }
      delete syncs[k]

      return {
        ...state,
        syncs,
      }
    }

    case 'HF_DS_DATA.CANDLES_MESSAGE': {
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
        _isObject(marketData[startMTS])
        || _isObject(marketData[endMTS])
      ) {
        console.warn(`received duplicate candles: ${from} - ${to}`)
      }

      return {
        ...state,

        [key]: {
          ...marketData,
          ...(_keyBy(data, c => `${c.mts}`)),
        },
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
