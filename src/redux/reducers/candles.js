import _isObject from 'lodash/isObject'
import _isArray from 'lodash/isArray'
import _last from 'lodash/last'
import _keyBy from 'lodash/keyBy'
import adapter from '../adapters/candles'

const syncKey = (msg = []) => {
  const [, symbol, tf, type, from, to] = msg
  return `${symbol}:${tf}:${type}:${from}:${to}`
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
    case 'DS_DATA.SYNC.START_MESSAGE': {
      const k = syncKey(payload)
      const total = _last(payload)

      return {
        ...state,
        syncs: {
          ...state.syncs,
          [k]: {
            curr: 0,
            total,
          },
        },
      }
    }

    case 'DS_DATA.SYNC.TICK_MESSAGE': {
      const k = syncKey(payload)
      const curr = _last(payload)
      const s = state.syncs[k]

      if (!s) {
        return state
      }

      return {
        ...state,
        syncs: {
          ...state.syncs,
          [k]: {
            total: s.total,
            curr: s.curr + 1, // ignore server curr, as they can be OoO
          },
        },
      }
    }

    case 'DS_DATA.SYNC.END_MESSAGE': {
      const k = syncKey(payload)
      const syncs = { ...state.syncs }
      delete syncs[k]

      return {
        ...state,
        syncs,
      }
    }

    case 'DS_DATA.CANDLES_MESSAGE': {
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
