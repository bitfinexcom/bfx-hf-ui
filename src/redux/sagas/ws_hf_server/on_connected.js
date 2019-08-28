import { put, select } from 'redux-saga/effects'

import { getActiveMarket } from '../../selectors/ui'
import WSHFActions from '../../actions/ws_hf_server'
import UIActions from '../../actions/ui'

let wasConnected = false

export default function * () {
  const activeMarket = yield select(getActiveMarket)

  yield put(WSHFActions.flushQueue())
  yield put(UIActions.saveActiveMarket(activeMarket))

  if (wasConnected) {
    yield put(WSHFActions.reconnected())
  }

  wasConnected = true
}
