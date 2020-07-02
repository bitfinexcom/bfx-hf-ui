import { put } from 'redux-saga/effects'
import A from '../../actions/ws'

let wasConnected = false

/**
 * Triggers a notification and signals if this was a reconnect event
 *
 * @generator
 */
export default function* () {
  yield put(A.flushQueue())

  if (wasConnected) {
    yield put(A.reconnected())
  }

  yield put(A.recvNotification({
    mts: Date.now(),
    status: 'success',
    text: 'Successfully connected to websocket server',
  }))

  wasConnected = true
}
