import _isString from 'lodash/isString'
import _isFinite from 'lodash/isFinite'
import t from '../constants/ws'
import ui from '../constants/ui'

const send = payload => ({
  type: t.BUFF_SEND,
  payload: _isString(payload)
    ? payload
    : JSON.stringify(payload),
})

export default {
  send,
  error: payload => ({ type: t.ERROR, payload }),
  flushQueue: () => ({ type: t.FLUSH_QUEUE }),

  connect: (destination = '') => ({
    type: t.CONNECT,
    payload: { destination },
  }),

  connected: () => ({ type: t.CONNECTED }),
  reconnected: () => ({ type: t.RECONNECTED }),
  disconnected: () => ({ type: t.DISCONNECTED }),
  disconnect: () => ({ type: t.DISCONNECT }),

  subscribed: ({ exID, chanID, chanData }) => ({
    type: t.SUBSCRIBED,
    payload: { exID, chanID, chanData },
  }),

  clearChannels: () => ({ type: t.CLEAR_CHANNELS }),

  unsubscribed: ({ chanId }) => ({
    type: t.UNSUBSCRIBED,
    payload: { chanId },
  }),

  subscribe: (exID, channel) => ({
    type: t.SUBSCRIBE,
    payload: { exID, channel },
  }),

  unsubscribe: (exID, channelDataOrID) => {
    const action = {
      type: t.UNSUBSCRIBE,
      payload: { exID },
    }

    if (_isFinite(channelDataOrID)) {
      action.payload.chanId = channelDataOrID
    } else {
      action.payload.chanData = channelDataOrID
    }

    return action
  },

  addChannelRequirement: (exID, channel) => ({
    type: t.ADD_CHANNEL_REQUIREMENT,
    payload: { exID, channel },
  }),

  removeChannelRequirement: (exID, channel) => ({
    type: t.REMOVE_CHANNEL_REQUIREMENT,
    payload: { exID, channel },
  }),

  recvDataExchanges: exchanges => ({
    type: t.DATA_EXCHANGES,
    payload: { exchanges },
  }),

  recvDataMarkets: (exID, markets) => ({
    type: t.DATA_MARKETS,
    payload: { exID, markets },
  }),

  recvUpdatedSettings: settings => ({
    type: ui.UPDATE_SETTINGS,
    payload: settings,
  }),

  bufferDataFromExchange: (exID, chanID, data) => ({
    type: t.BUFFER_DATA_FROM_EXCHANGE,
    payload: { exID, chanID, data },
  }),

  flushDataFromExchange: updates => ({
    type: t.FLUSH_DATA_FROM_EXCHANGE,
    payload: { updates },
  }),

  recvDataCandle: (exID, channel, candle) => ({
    type: t.DATA_CANDLE,
    payload: { exID, channel, candle },
  }),

  recvDataCandles: ({
    exID, symbol, tf, candles, start, end,
  }) => ({
    type: t.DATA_CANDLES,
    payload: {
      exID, symbol, tf, candles, start, end,
    },
  }),

  recvDataTicker: (exID, channel, ticker) => ({
    type: t.DATA_TICKER,
    payload: { exID, channel, ticker },
  }),

  recvDataTrade: (exID, channel, trade) => ({
    type: t.DATA_TRADE,
    payload: { exID, channel, trade },
  }),

  recvDataTrades: (exID, channel, trades) => ({
    type: t.DATA_TRADES,
    payload: { exID, channel, trades },
  }),

  recvDataBook: (exID, channel, book) => ({
    type: t.DATA_BOOK,
    payload: { exID, channel, book },
  }),

  recvDataSyncStart: ({
    exID, symbol, tf, start, end,
  }) => ({
    type: t.DATA_SYNC_START,
    payload: {
      exID, symbol, tf, start, end,
    },
  }),

  recvDataSyncEnd: ({
    exID, symbol, tf, start, end,
  }) => ({
    type: t.DATA_SYNC_END,
    payload: {
      exID, symbol, tf, start, end,
    },
  }),

  recvStrategy: ({ id, strategy }) => ({
    type: t.DATA_STRATEGY,
    payload: { id, strategy },
  }),

  recvStrategies: ({ strategies }) => ({
    type: t.DATA_STRATEGIES,
    payload: { strategies },
  }),

  recvAPICredentialsConfigured: ({ exID }) => ({
    type: t.DATA_API_CREDENTIALS_CONFIGURED,
    payload: { exID },
  }),

  recvClientStatusUpdate: ({ exID, status }) => ({
    type: t.DATA_CLIENT_STATUS_UPDATE,
    payload: { exID, status },
  }),

  recvPositions: ({ exID, positions }) => ({
    type: t.DATA_POSITIONS,
    payload: { exID, positions },
  }),

  recvPosition: ({ exID, position }) => ({
    type: t.DATA_POSITION,
    payload: { exID, position },
  }),

  recvPositionClose: ({ exID, position }) => ({
    type: t.DATA_POSITION_CLOSE,
    payload: { exID, position },
  }),

  recvBalances: ({ exID, balances }) => ({
    type: t.DATA_BALANCES,
    payload: { exID, balances },
  }),

  recvBalance: ({ exID, balance }) => ({
    type: t.DATA_BALANCE,
    payload: { exID, balance },
  }),

  recvOrders: ({ exID, orders }) => ({
    type: t.DATA_ORDERS,
    payload: { exID, orders },
  }),

  recvOrder: ({ exID, order }) => ({
    type: t.DATA_ORDER,
    payload: { exID, order },
  }),

  recvOrderClose: ({ exID, order }) => ({
    type: t.DATA_ORDER_CLOSE,
    payload: { exID, order },
  }),

  recvDataAlgoOrder: ({ exID, ao }) => ({
    type: t.DATA_ALGO_ORDER,
    payload: { exID, ao },
  }),

  recvDataAlgoOrderStopped: ({ exID, gid }) => ({
    type: t.DATA_ALGO_ORDER_STOPPED,
    payload: { exID, gid },
  }),

  recvDataAlgoOrders: ({ exID, aos }) => ({
    type: t.DATA_ALGO_ORDERS,
    payload: { exID, aos },
  }),

  recvNotification: notification => ({
    type: t.DATA_NOTIFICATION,
    payload: { notification },
  }),

  recvAuthConfigured: configured => ({
    type: t.DATA_AUTH_CONFIGURED,
    payload: { configured },
  }),

  recvAuthToken: token => ({
    type: t.DATA_AUTH_TOKEN,
    payload: { token },
  }),

  initAuth: password => send(['auth.init', password]),
  auth: password => send(['auth.submit', password]),
  resetAuth: () => send(['auth.reset']),
}
