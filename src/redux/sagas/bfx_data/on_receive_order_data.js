import { addOrderUpdate } from './worker_order_data'

export default function (action = {}) {
  const { payload  = [] } = action
  addOrderUpdate(payload)
}