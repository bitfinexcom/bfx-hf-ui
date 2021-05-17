import { put } from 'redux-saga/effects'
import { v4 } from 'uuid'
import A from '../../actions/ws'

let wasConnected = false

export default function* () {
  yield put(A.flushQueue())

  if (wasConnected) {
    yield put(A.reconnected())
  }

  yield put(A.recvNotification({
    mts: Date.now(),
    status: 'success',
    text: 'Successfully connected to websocket server',
    uid: v4(),
  }))

  wasConnected = true
}
