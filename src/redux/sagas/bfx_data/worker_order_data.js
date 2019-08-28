import { put, delay } from 'redux-saga/effects'
import BFXDataActions from '../../actions/bfx_data'

const ORDERS_TOTTLE_MS = 750
let orderUpdates = []

const addOrderUpdate = (update) => {
  orderUpdates.push(update)
}

function* orderDataWorker() {
  while (true) {
    if (orderUpdates.length > 0) {
      yield put(BFXDataActions.flushOrderData(orderUpdates))
      orderUpdates = []
    }

    yield delay(ORDERS_TOTTLE_MS)
  }
}

export {
  orderDataWorker,
  addOrderUpdate,
}
