import { put, select } from 'redux-saga/effects'

import WSActions from '../../actions/ws'
import { getActiveMarket, getActiveExchange } from '../../selectors/ui'

export default function* ({ payload }) {
  const { chanID, chanName } = payload
  const exID = yield select(getActiveExchange)
  const marketData = yield select(getActiveMarket)
  const chanData = [chanName, marketData]

  yield put(WSActions.subscribed({ exID, chanID, chanData }))
}
