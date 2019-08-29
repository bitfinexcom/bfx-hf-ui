import {
  PublicTrade, Order, Position, TradingTicker, Notification,
} from 'bfx-api-node-models'

const positionAdapter = (data = []) => {
  return new Position(data).toJS()
}

const orderAdapter = (data = []) => {
  return new Order(data).toJS()
}

// NOTE: No transform; we deal w/ array OBs
const orderBookAdapter = (data = []) => {
  return data
}

const tradesAdapter = (data = []) => {
  return new PublicTrade(data).toJS()
}

const tickerAdapter = (data = []) => {
  return new TradingTicker(data).toJS()
}

const notificationAdapter = (data = []) => {
  if (data[1] === 'ucm-notify-ui') { // HF notification
    return {
      mts: data[0],
      type: data[1],
      status: data[4].level.toUpperCase(),
      text: data[4].message,
    }
  }
  return new Notification(data).toJS()
}

export {
  positionAdapter,
  orderBookAdapter,
  tradesAdapter,
  orderAdapter,
  tickerAdapter,
  notificationAdapter,
}
