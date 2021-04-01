const REDUCER_PATHS = {
  WS: 'ws',
  ROUTER: 'router',
  META: 'meta',
  UI: 'ui',
  NOTIFICATIONS: 'notifications',
  AOS: 'aos',
}

const MAX_STORED_TRADES = 25

const PUB_WS_API_URL = process.env.REACT_APP_WS_API_URL || 'wss://api-pub.bitfinex.com/ws/2'

export {
  REDUCER_PATHS,
  PUB_WS_API_URL,
  MAX_STORED_TRADES,
}
