import { put } from 'redux-saga/effects'
import A from '../../actions/ws_dtc_server'
import BFXDataActions from '../../actions/bfx_data'

let wasConnected = false

export default function * () {
  yield put(A.flushQueue())

  if (wasConnected) {
    yield put(A.reconnected())
  }

  yield put(BFXDataActions.notification({
    mts: Date.now(),
    status: 'success',
    text: 'Successfully connected to websocket server'
  }))

  wasConnected = true
}
