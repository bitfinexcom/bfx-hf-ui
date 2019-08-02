import { fork } from 'redux-saga/effects'
import { WSHFSaga } from './ws-hf-server'
import restSaga from './rest'

export default function * rootSaga () {
  yield fork(WSHFSaga)
  yield fork(restSaga)
}
