import _keyBy from 'lodash/keyBy'
import _last from 'lodash/last'
import _max from 'lodash/max'
import _min from 'lodash/min'

import t from '../../constants/ws'
import candleWidth from '../../../util/candle_width'
import TIME_FRAMES from '../../../util/time_frames'

const updateKey = ({ exID, symbol, tf }) => {
  return `${exID}:${symbol}:${tf}`
}

const syncKey = ({
  exID, symbol, tf, start, end,
}) => {
  return `${exID}:${symbol}:${tf}:${start}:${end}`
}

const marketKey = ({ symbol, tf }) => (
  `${tf}:${symbol}`
)

let lastUpdateCounter = 0

function getInitialState() {
  return {
    syncs: {},
    data: {},
    lastUpdate: {},
  }
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload } = action

  switch (type) {
    case t.DATA_SYNC_START: {
      const k = syncKey(payload)

      return {
        ...state,
        syncs: {
          ...state.syncs,
          [k]: true,
        },
      }
    }

    case t.DATA_SYNC_END: {
      const k = syncKey(payload)
      const { [k]: _, ...remainingSyncs } = state.syncs

      return {
        ...state,
        syncs: remainingSyncs,
      }
    }

    case t.DATA_CANDLE: {
      const { exID, channel, candle } = payload
      const [, tf, market] = channel
      const symbol = market.uiID
      const uKey = updateKey({ exID, symbol, tf })
      const dataKey = marketKey({ symbol, tf })

      return {
        ...state,

        lastUpdate: {
          ...state.lastUpdate,
          [uKey]: ++lastUpdateCounter,
        },

        data: {
          ...state.data,

          [exID]: {
            ...(state.data[exID] || {}),
            [dataKey]: {
              ...((state.data[exID] || {})[dataKey] || {}),
              ...(_keyBy([candle], c => `${c.mts}`)),
            },
          },
        },
      }
    }

    case t.DATA_TRADES:
    case t.DATA_TRADE: {
      const { exID, channel } = payload
      const [, market] = channel
      const trade = payload.trade || payload.trades[0]
      const { amount, price } = trade
      const symbol = market.uiID

      const lastUpdatePatch = {}
      const exchangeDataPatch = {}
      const tfs = Object.values(TIME_FRAMES[exID] || {})
      let tf
      let dataKey
      let uKey

      for (let i = 0; i < tfs.length; i += 1) {
        tf = tfs[i]
        dataKey = marketKey({ symbol, tf })
        uKey = updateKey({ exID, symbol, tf })

        if ((state.data[exID] || {})[dataKey]) {
          exchangeDataPatch[dataKey] = { ...state.data[exID][dataKey] }
          lastUpdatePatch[uKey] = ++lastUpdateCounter

          const lastMTS = _max(Object.keys(exchangeDataPatch[dataKey]).map(mts => +mts))
          const c = exchangeDataPatch[dataKey][`${lastMTS}`]

          exchangeDataPatch[dataKey][`${lastMTS}`] = {
            ...c,
            volume: c.volume + amount,
            high: _max([price, c.high]),
            low: _min([price, c.low]),
            close: price,
          }
        }
      }

      return {
        ...state,

        lastUpdate: {
          ...state.lastUpdate,
          ...lastUpdatePatch,
        },

        data: {
          ...state.data,

          [exID]: {
            ...(state.data[exID] || {}),
            ...exchangeDataPatch,
          },
        },
      }
    }

    case t.DATA_CANDLES: {
      const {
        exID, symbol, tf, candles, end,
      } = payload

      if (candles.length === 0) {
        return state
      }

      const uKey = updateKey({ exID, symbol, tf })
      const dataKey = marketKey({ symbol, tf })
      const paddedCandles = [...candles]
      let lastCandle = _last(paddedCandles)

      while (lastCandle.mts < end) {
        lastCandle = {
          mts: lastCandle.mts + candleWidth(tf),
          symbol: lastCandle.symbol,
          open: lastCandle.close,
          high: lastCandle.close,
          low: lastCandle.close,
          close: lastCandle.close,
          volume: 0,
        }

        paddedCandles.push(lastCandle)
      }

      return {
        ...state,

        lastUpdate: {
          ...state.lastUpdate,
          [uKey]: ++lastUpdateCounter,
        },

        data: {
          ...state.data,

          [exID]: {
            ...(state.data[exID] || {}),
            [dataKey]: {
              ...((state.data[exID] || {})[dataKey] || {}),
              ...(_keyBy(paddedCandles, c => `${c.mts}`)),
            },
          },
        },
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
