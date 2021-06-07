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

  connect: (alias = '', destination = '') => ({
    type: t.CONNECT,
    payload: { alias, destination },
  }),

  connected: (alias) => ({ type: t.CONNECTED, payload: { alias } }),
  reconnected: (alias) => ({ type: t.RECONNECTED, payload: { alias } }),
  disconnected: (alias) => ({ type: t.DISCONNECTED, payload: { alias } }),
  disconnect: (alias) => ({ type: t.DISCONNECT, payload: { alias } }),

  subscribed: ({ chanID, chanData }) => ({
    type: t.SUBSCRIBED,
    payload: { chanID, chanData },
  }),

  clearChannels: () => ({ type: t.CLEAR_CHANNELS }),

  unsubscribed: ({ chanId }) => ({
    type: t.UNSUBSCRIBED,
    payload: { chanId },
  }),

  subscribe: (channel) => ({
    type: t.SUBSCRIBE,
    payload: { channel },
  }),

  pubSubscribed: ({ chanID, chanName, symbol }) => ({
    type: t.PUB_SUBSCRIBED,
    payload: { chanID, chanName, symbol },
  }),

  unsubscribe: (channelDataOrID) => {
    const action = {
      type: t.UNSUBSCRIBE,
      payload: {},
    }
    if (_isFinite(channelDataOrID)) {
      action.payload.chanId = channelDataOrID
    } else {
      action.payload.chanData = channelDataOrID
    }
    return action
  },

  addChannelRequirement: (channel) => ({
    type: t.ADD_CHANNEL_REQUIREMENT,
    payload: { channel },
  }),

  removeChannelRequirement: (channel) => ({
    type: t.REMOVE_CHANNEL_REQUIREMENT,
    payload: { channel },
  }),

  setBacktestLoading: () => ({
    type: t.SET_BACKTEST_LOADING,
    payload: {},
  }),

  recvDataMarkets: (markets) => ({
    type: t.DATA_MARKETS,
    payload: { markets },
  }),

  recvUpdatedSettings: settings => ({
    type: ui.UPDATE_SETTINGS,
    payload: settings,
  }),

  bufferDataFromExchange: (
    chanID, data, rawData = null,
  ) => ({
    type: t.BUFFER_DATA_FROM_EXCHANGE,
    payload: {
      chanID,
      data,
      rawData,
    },
  }),

  flushDataFromExchange: updates => ({
    type: t.FLUSH_DATA_FROM_EXCHANGE,
    payload: { updates },
  }),

  recvDataTicker: (channel, ticker) => ({
    type: t.DATA_TICKER,
    payload: { channel, ticker },
  }),

  recvDataTrades: (channel, trades) => ({
    type: t.DATA_TRADES,
    payload: { channel, trades },
  }),

  recvDataBook: (channel, book) => ({
    type: t.DATA_BOOK,
    payload: { channel, book },
  }),

  recvDataSyncStart: ({
    symbol, tf, start, end,
  }) => ({
    type: t.DATA_SYNC_START,
    payload: {
      symbol, tf, start, end,
    },
  }),

  recvDataSyncEnd: ({
    symbol, tf, start, end,
  }) => ({
    type: t.DATA_SYNC_END,
    payload: {
      symbol, tf, start, end,
    },
  }),

  recvStrategy: ({ id, strategy }) => ({
    type: t.DATA_STRATEGY,
    payload: { id, strategy },
  }),

  recvRemovedStrategy: (id) => ({
    type: t.DATA_REMOVE_STRATEGY,
    payload: { id },
  }),

  recvStrategies: ({ strategies }) => ({
    type: t.DATA_STRATEGIES,
    payload: { strategies },
  }),

  recvAPICredentialsConfigured: () => ({
    type: t.DATA_API_CREDENTIALS_CONFIGURED,
    payload: {},
  }),

  recvClientStatusUpdate: ({ status }) => ({
    type: t.DATA_CLIENT_STATUS_UPDATE,
    payload: { status },
  }),

  recvPositions: ({ positions }) => ({
    type: t.DATA_POSITIONS,
    payload: { positions },
  }),

  recvPosition: ({ position }) => ({
    type: t.DATA_POSITION,
    payload: { position },
  }),

  recvPositionClose: ({ position }) => ({
    type: t.DATA_POSITION_CLOSE,
    payload: { position },
  }),

  recvBalances: ({ balances }) => ({
    type: t.DATA_BALANCES,
    payload: { balances },
  }),

  recvBalance: ({ balance }) => ({
    type: t.DATA_BALANCE,
    payload: { balance },
  }),

  recvOrders: ({ orders }) => ({
    type: t.DATA_ORDERS,
    payload: { orders },
  }),

  recvOrder: ({ order }) => ({
    type: t.DATA_ORDER,
    payload: { order },
  }),

  recvOrderClose: ({ order }) => ({
    type: t.DATA_ORDER_CLOSE,
    payload: { order },
  }),

  recvDataAlgoOrder: ({ ao }) => ({
    type: t.DATA_ALGO_ORDER,
    payload: { ao },
  }),

  recvDataAlgoOrderStopped: ({ gid }) => ({
    type: t.DATA_ALGO_ORDER_STOPPED,
    payload: { gid },
  }),

  recvDataAlgoOrders: ({ aos }) => ({
    type: t.DATA_ALGO_ORDERS,
    payload: { aos },
  }),

  clearAlgoOrders: () => ({
    type: t.CLEAR_ALGO_ORDERS,
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

  recvBacktestStart: opts => ({
    type: t.BACKTEST_START,
    payload: opts,
  }),

  recvBacktestEnd: opts => ({
    type: t.BACKTEST_END,
    payload: opts,
  }),

  recvBacktestResults: opts => ({
    type: t.BACKTEST_RESULTS,
    payload: opts,
  }),

  recvBacktestCandle: candle => ({
    type: t.BACKTEST_CANDLE,
    payload: candle,
  }),

  recvBacktestTrade: trade => ({
    type: t.BACKTEST_TRADE,
    payload: trade,
  }),

  recvBacktestExecute: opts => ({
    type: t.BACKTEST_EXECUTE,
    payload: opts,
  }),

  recvUpdatedFavoritePairs: pairs => ({
    type: t.UPDATE_FAVORITE_PAIRS,
    payload: pairs,
  }),

  purgeDataBook: (channel) => ({
    type: t.PURGE_DATA_BOOK,
    payload: { channel },
  }),

  purgeDataTrades: (channel) => ({
    type: t.PURGE_DATA_TRADES,
    payload: { channel },
  }),

  setBacktestOptions: options => ({
    type: t.SET_BACKTEST_OPTIONS,
    payload: { options },
  }),

  purgeBacktestData: () => ({
    type: t.PURGE_DATA_BACKTEST,
  }),
  resetBacktestData: () => ({
    type: t.RESET_DATA_BACKTEST,
  }),
  initAuth: password => send(['auth.init', password, 'main']),
  auth: (password, mode) => send(['auth.submit', password, mode]),
  resetAuth: () => send(['auth.reset']),
  onUnload: (authToken, mode) => send(['algo_order.pause', authToken, mode]),
}
