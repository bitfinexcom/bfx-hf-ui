import { put, delay } from 'redux-saga/effects'
import WSDTCActions from '../../actions/ws_dtc_server'

const UPDATES_THROTTLE_MS = 100
let updates = []

const addUpdate = (update) => {
  updates.push(update)
}

function* updateWorker() {
  while (true) {
    if (updates.length > 0) {
      yield put(WSDTCActions.flushDataFromExchange(updates))
      updates = []
    }

    yield delay(UPDATES_THROTTLE_MS)
  }
}

export {
  updateWorker,
  addUpdate,
}
