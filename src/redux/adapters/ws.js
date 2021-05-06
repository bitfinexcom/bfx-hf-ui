import { Position, Notification } from 'bfx-api-node-models'

const positionAdapter = (data = []) => {
  return new Position(data).toJS()
}

const balanceAdapter = (data = []) => ({
  currency: data[0],
  context: data[1],
  balance: data[2],
  available: data[3],
})

const orderAdapter = (data = []) => ({
  id: data[0],
  gid: data[1],
  cid: data[2],
  symbol: data[3],
  created: data[4],
  amount: data[5],
  originalAmount: data[6],
  type: data[7],
  status: data[8],
  price: data[9],
})

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
  notificationAdapter,
  positionAdapter,
  balanceAdapter,
  orderAdapter,
}
