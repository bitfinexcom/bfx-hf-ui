import { fork } from 'redux-saga/effects'
import WSSaga from './ws'
import UISaga from './ui'

export default function* rootSaga() {
  yield fork(WSSaga)
  yield fork(UISaga)
}
