import { fork } from 'redux-saga/effects'
import WSSaga from './ws'
import UISaga from './ui'
import RestSaga from './rest'
import AOSaga from './ao'

export default function* rootSaga() {
  yield fork(WSSaga)
  yield fork(UISaga)
  yield fork(RestSaga)
  yield fork(AOSaga)
}
