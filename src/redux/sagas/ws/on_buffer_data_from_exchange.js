import { addUpdate } from './worker_flush_exchange_data'

export default function (action = {}) {
  const { payload = {} } = action
  addUpdate(payload)
}
