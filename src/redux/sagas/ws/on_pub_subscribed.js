import { put, select } from 'redux-saga/effects'

import WSActions from '../../actions/ws'
import { getActiveMarket } from '../../selectors/ui'

export default function* ({ payload }) {
  const { chanID, chanName } = payload
  const marketData = yield select(getActiveMarket)
  const chanData = [chanName, marketData]

  yield put(WSActions.subscribed({ chanID, chanData }))
}
