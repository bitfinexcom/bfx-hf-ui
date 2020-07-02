import { addUpdate } from './worker_flush_exchange_data'

/**
 * @param {ReduxAction} action - action
 */
export default function (action = {}) {
  const { payload = {} } = action
  addUpdate(payload)
}
