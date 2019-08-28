import { fork } from 'redux-saga/effects'
// import WSHFSaga from './ws_hf_server'
import WSDTCSaga from './ws_dtc_server'
import BFXDataSaga from './bfx_data'
import BFXNotificationsSaga from './bfx_notifications'
import ASNotificationsSaga from './as_notifications'
import UISaga from './ui'

export default function * rootSaga () {
  yield fork(WSDTCSaga)
  // yield fork(WSHFSaga)
  yield fork(BFXDataSaga)
  yield fork(BFXNotificationsSaga)
  yield fork(ASNotificationsSaga)
  yield fork(UISaga)
}
