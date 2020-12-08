export default {
  SOCKET_ERROR: 'WS_SOCKET_ERROR',
  SEND: 'WS_SEND',
  BUFF_SEND: 'WS_BUFF_SEND',
  CONNECT: 'WS_CONNECT',
  DISCONNECT: 'WS_DISCONNECT',
  CONNECTED: 'WS_CONNECTED',
  RECONNECTED: 'WS_RECONNECTED',
  DISCONNECTED: 'WS_DISCONNECTED',
  FLUSH_QUEUE: 'WS_FLUSH_QUEUE',

  DATA_AUTH_CONFIGURED: 'WS_DATA_AUTH_CONFIGURED',
  DATA_AUTH_TOKEN: 'WS_DATA_AUTH_TOKEN',
  DATA_BOOK: 'WS_DATA_BOOK',
  DATA_TRADES: 'WS_DATA_TRADES',
  DATA_CANDLE: 'WS_DATA_CANDLE',
  DATA_CANDLES: 'WS_DATA_CANDLES',
  DATA_TICKER: 'WS_DATA_TICKER',
  DATA_MARKETS: 'WS_DATA_MARKETS',
  DATA_EXCHANGES: 'WS_DATA_EXCHANGES',
  DATA_STRATEGY: 'WS_DATA_STRATEGY',
  DATA_REMOVE_STRATEGY: 'WS_DATA_REMOVE_STRATEGY',
  DATA_STRATEGIES: 'WS_DATA_STRATEGIES',
  DATA_API_CREDENTIALS_CONFIGURED: 'WS_DATA_API_CREDENTIALS_CONFIGURED',
  DATA_CLIENT_STATUS_UPDATE: 'WS_DATA_CLIENT_STATUS_UPDATE',
  DATA_POSITIONS: 'WS_DATA_POSITIONS',
  DATA_POSITION: 'WS_DATA_POSITION',
  DATA_POSITION_CLOSE: 'WS_DATA_POSITION_CLOSE',
  DATA_BALANCES: 'WS_DATA_BALANCES',
  DATA_BALANCE: 'WS_DATA_BALANCE',
  DATA_ORDERS: 'WS_DATA_ORDERS',
  DATA_ORDER: 'WS_DATA_ORDER',
  DATA_ORDER_CLOSE: 'WS_DATA_ORDER_CLOSE',
  DATA_ALGO_ORDER_STOPPED: 'WS_DATA_ALGO_ORDER_STOPPED',
  DATA_ALGO_ORDER: 'WS_DATA_ALGO_ORDER',
  DATA_ALGO_ORDERS: 'WS_DATA_ALGO_ORDERS',
  DATA_NOTIFICATION: 'WS_DATA_NOTIFICATION',

  PURGE_DATA_CANDLES: 'WS_PURGE_DATA_CANDLES',
  PURGE_DATA_TRADES: 'WS_PURGE_DATA_TRADES',
  PURGE_DATA_BOOK: 'WS_PURGE_DATA_BOOK',
  PURGE_DATA_BACKTEST: 'WS_PURGE_DATA_BACKTEST',

  DATA_SYNC_START: 'WS_DATA_SYNC_START',
  DATA_SYNC_END: 'WS_DATA_SYNC_END',

  BACKTEST_EXECUTE: 'WS_BACKTEST_EXECUTE',
  BACKTEST_CANDLE: 'WS_BACKTEST_CANDLE',
  BACKTEST_TRADE: 'WS_BACKTEST_TRADE',
  BACKTEST_START: 'WS_BACKTEST_START',
  BACKTEST_END: 'WS_BACKTEST_END',
  BACKTEST_RESULTS: 'WS_BACKTEST_RESULTS',
  SET_BACKTEST_LOADING: 'WS_SET_BACKTEST_LOADING',

  BUFFER_DATA_FROM_EXCHANGE: 'WS_BUFFER_DATA_FROM_EXCHANGE',
  FLUSH_DATA_FROM_EXCHANGE: 'WS_FLUSH_DATA_FROM_EXCHANGE',

  ADD_CHANNEL_REQUIREMENT: 'WS_ADD_CHANNEL_REQ',
  REMOVE_CHANNEL_REQUIREMENT: 'WS_RM_CHANNEL_REQ',

  CLEAR_CHANNELS: 'WS_CLEAR_CHANNELS',
  SUBSCRIBE: 'WS_SUBSCRIBE',
  SUBSCRIBED: 'WS_SUBSCRIBED',
  UNSUBSCRIBE: 'WS_UNSUBSCRIBE',
  UNSUBSCRIBED: 'WS_UNSUBSCRIBED',

  DAZAAR_LIST: 'DAZAAR_LIST',
}
