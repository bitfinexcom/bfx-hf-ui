import { put, select } from 'redux-saga/effects'
import Debug from 'debug'
import { getSocket } from '../../selectors/ws_dtc_server'
import WSDTCTypes from '../../constants/ws_dtc_server'

const debug = Debug('dtc:rx:s:ws-dtc:msg-q')
let queue = []

// Place every outgoing message in a queue if connection is offline
export default function* (action = {}) {
  const {
    status,
  } = yield select(getSocket)

  if (action.type !== WSDTCTypes.FLUSH_QUEUE) {
    queue = [...queue, action]
  }

  if (status !== 'online' || queue.length === 0) {
    return
  }

  if (queue.length > 1) {
    debug('flushing %d messages', queue.length)
  }

  for (let i = 0; i < queue.length; i += 1) {
    const queuedAction = queue[i]

    if (queuedAction.type === WSDTCTypes.BUFF_SEND) {
      queuedAction.type = WSDTCTypes.SEND
    }

    yield put(queuedAction)
  }

  queue = []
}
