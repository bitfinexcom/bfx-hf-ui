import { put, delay } from 'redux-saga/effects'
import WSActions from '../../actions/ws'

const UPDATES_THROTTLE_MS = 100
let updates = []

const addUpdate = (update) => {
  updates.push(update)
}

/**
 * Flushes received exchange data to relevant reducers on an interval
 *
 * @generator
 */
function* updateWorker() {
  while (true) {
    if (updates.length > 0) {
      yield put(WSActions.flushDataFromExchange(updates))
      updates = []
    }

    yield delay(UPDATES_THROTTLE_MS)
  }
}

export {
  updateWorker,
  addUpdate,
}
