import { put, delay } from 'redux-saga/effects'
import BFXDataActions from '../../actions/bfx_data'

const TRADES_THROTTLE_MS = 750
let tradeUpdates = []

const addTradeUpdate = (update) => {
  tradeUpdates.push(update)
}

function* tradesUpdateWorker() {
  while (true) {
    if (tradeUpdates.length > 0) {
      yield put(BFXDataActions.flushTradesData(tradeUpdates))
      tradeUpdates = []
    }

    yield delay(TRADES_THROTTLE_MS)
  }
}

export {
  tradesUpdateWorker,
  addTradeUpdate,
}
