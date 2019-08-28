import { put, delay } from 'redux-saga/effects'
import BFXDataActions from '../../actions/bfx_data'

const BOOK_THROTTLE_MS = 750
let bookUpdates = []

const addBookUpdate = (update) => {
  bookUpdates.push(update)
}

function* bookUpdateWorker() {
  while (true) {
    if (bookUpdates.length > 0) {
      yield put(BFXDataActions.flushBookData(bookUpdates))
      bookUpdates = []
    }

    yield delay(BOOK_THROTTLE_MS)
  }
}

export {
  bookUpdateWorker,
  addBookUpdate,
}
