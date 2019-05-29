/*
import { fork } from 'redux-saga/effects'
import { WSHFSaga } from './ws-hf-server'
import restSaga from './rest'
import tickerSaga from './tickers'
*/

export default function * rootSaga () {
  console.log('!!! NOTE: sagas temporarily disabled for dev !!!')

  /*
  yield fork(WSHFSaga)
  yield fork(restSaga)
  yield fork(tickerSaga)
  */
}
