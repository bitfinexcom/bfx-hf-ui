import { takeEvery, fork } from 'redux-saga/effects'

import BFXDataTypes from '../../constants/bfx_data'

import onReceiveOrderData from './on_receive_order_data'
import { tradesUpdateWorker } from './worker_trades_update'
import { bookUpdateWorker } from './worker_book_update'
import { orderDataWorker } from './worker_order_data'

export default function* () {
  yield takeEvery(BFXDataTypes.RECV_ORDER_DATA, onReceiveOrderData)

  yield fork(bookUpdateWorker)
  yield fork(tradesUpdateWorker)
  yield fork(orderDataWorker)
}
