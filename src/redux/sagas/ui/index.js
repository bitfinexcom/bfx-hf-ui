import { takeEvery } from 'redux-saga/effects'

import UITypes from '../../constants/ui'
import onChangeActiveMarket from './on_change_active_market'

export default function* () {
  yield takeEvery(UITypes.SET_ACTIVE_MARKET, onChangeActiveMarket)
}
