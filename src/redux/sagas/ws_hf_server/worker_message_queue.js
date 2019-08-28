import { put, select } from 'redux-saga/effects'
import { getSocket } from '../../selectors/ws_hf_server'
import WSHFTypes from '../../constants/ws_hf_server'
import Debug from 'debug'

const debug = Debug('dtc:rx:s:ws-hf-server:msg-q')
let queue = []

// Place every outgoing message in a queue if connection is offline
export default function * (action = {}) {
  const {
    status
  } = yield select(getSocket)

  if (action.type !== WSHFTypes.FLUSH_QUEUE) {
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

    if (queuedAction.type === WSHFTypes.BUFF_SEND) {
      queuedAction.type = WSHFTypes.SEND
    }

    yield put(queuedAction)
  }

  queue = []
}
