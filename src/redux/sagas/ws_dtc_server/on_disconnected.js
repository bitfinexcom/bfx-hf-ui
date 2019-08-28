import { put } from 'redux-saga/effects'
import WSDTCActions from '../../actions/ws_dtc_server'
import BFXDataActions from '../../actions/bfx_data'

export default function * () {
  yield put(WSDTCActions.clearChannels())
  yield put(BFXDataActions.notification({
    mts: Date.now(),
    status: 'error',
    text: 'Disconnected from websocket server'
  }))
}
