import { fork } from 'redux-saga/effects'
import {
  messageQueueSaga, connectionSaga, initSaga
} from './ws'

export default function * rootSaga () {
  yield fork(messageQueueSaga)
  yield fork(initSaga)
  yield fork(connectionSaga)
}
