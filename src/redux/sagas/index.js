import { fork } from 'redux-saga/effects'
import { WSHFSaga } from './ws-hf-server'
import restSaga from './rest'
import tickerSaga from './tickers'
import settingsSaga from './settings'
import calcSaga from './calc'
import { onToggleSaga, onSetOrderSaga } from './UI.persistence'

export default function * rootSaga () {
  yield fork(WSHFSaga)
  yield fork(restSaga)
  yield fork(tickerSaga)
  yield fork(settingsSaga)
  yield fork(calcSaga)
  yield fork(onToggleSaga)
  yield fork(onSetOrderSaga)
}
