import { fork } from 'redux-saga/effects'
import WSSaga from './ws'
import UISaga from './ui'
import RestSaga from './rest'

/**
 * @generator
 */
export default function* rootSaga() {
  yield fork(WSSaga)
  yield fork(UISaga)
  yield fork(RestSaga)
}
