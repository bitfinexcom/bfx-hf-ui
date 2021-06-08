import { fork } from 'redux-saga/effects'
import { reduxSagas } from '@ufx-ui/bfx-containers'

import WSSaga from './ws'
import UISaga from './ui'
import RestSaga from './rest'
import AOSaga from './ao'
import metaSaga from './meta'

export default function* rootSaga() {
  yield fork(WSSaga)
  yield fork(UISaga)
  yield fork(RestSaga)
  yield fork(AOSaga)
  yield fork(metaSaga)
  yield fork(reduxSagas.wsSaga)
}
