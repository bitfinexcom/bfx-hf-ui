import types from '../constants/bfx_data'

const positionsSnapshot = (positions) => ({
  type: types.POSITIONS_SNAPSHOT,
  payload: {
    positions,
  }
})

const positionUpdate = (position) => ({
  type: types.POSITION_UPDATE,
  payload: {
    position,
  }
})

const positionClose = (position) => ({
  type: types.POSITION_CLOSE,
  payload: {
    position,
  }
})

const ordersSnapshot = (orders) => ({
  type: types.ORDERS_SNAPSHOT,
  payload: {
    orders,
  }
})

const orderUpdate = (order) => ({
  type: types.ORDER_UPDATE,
  payload: {
    order,
  }
})

const orderNew = (order) => ({
  type: types.ORDER_NEW,
  payload: {
    order,
  }
})

const orderClose = (order) => ({
  type: types.ORDER_CLOSE,
  payload: {
    order,
  }
})

const ticker = (ticker) => ({
  type: types.TICKER,
  payload: {
    ticker,
  },
})

const recvChannelData = (payload) => ({
  type: types.RECV_CHANNEL_DATA,
  payload,
})

const recvOrderData = (payload) => ({
  type: types.RECV_ORDER_DATA,
  payload,
})

const flushBookData = (updates) => ({
  type: types.FLUSH_BOOK_DATA,
  payload: {
    updates,
  }
})

const flushTradesData = (updates) => ({
  type: types.FLUSH_TRADES_DATA,
  payload: {
    updates,
  }
})

const flushOrderData = (updates) => ({
  type: types.FLUSH_ORDER_DATA,
  payload: {
    updates,
  }
})

const notification = (notification) => ({
  type: types.NOTIFICATION,
  payload: {
    notification,
  }
})

export default {
  positionsSnapshot,
  positionUpdate,
  positionClose,

  ordersSnapshot,
  orderUpdate,
  orderClose,
  orderNew,

  ticker,
  notification,

  recvChannelData,
  recvOrderData,

  flushBookData,
  flushTradesData,
  flushOrderData,
}
