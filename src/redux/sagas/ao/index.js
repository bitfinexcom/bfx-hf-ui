import { takeEvery } from 'redux-saga/effects'

import types from '../../constants/ao'

import getActiveAlgoOrders from './get_active_algo_orders'
import handleActiveAlgoOrders from './handle_active_algo_orders'

export default function* () {
  yield takeEvery(types.GET_ACTIVE_AOS, getActiveAlgoOrders)
  yield takeEvery(types.HANDLE_ACTIVE_AOS, handleActiveAlgoOrders)
}
