import { takeEvery, fork } from 'redux-saga/effects'

import UITypes from '../../constants/ui'
import onChangeActiveMarket from './on_change_active_market'
import workerFetchRemoteVersion from './worker_fetch_remote_version'

export default function* () {
  yield fork(workerFetchRemoteVersion)
  yield takeEvery(UITypes.SET_ACTIVE_MARKET, onChangeActiveMarket)
}
