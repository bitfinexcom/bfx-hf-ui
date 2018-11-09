import { fork } from 'redux-saga/effects'
import { WSDSSaga } from './ws-data-server'
import { WSBFXSaga } from './ws-bfx'
import restSaga from './rest'

export default function * rootSaga () {
  yield fork(WSDSSaga)
  yield fork(WSBFXSaga)
  yield fork(restSaga)
}
