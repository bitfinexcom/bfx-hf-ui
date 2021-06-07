import { put, select } from 'redux-saga/effects'

import WSActions from '../../actions/ws'
import { getMarketBySymbol } from '../../selectors/meta'

export default function* ({ payload }) {
  const { chanID, chanName, symbol } = payload
  const marketData = yield select(getMarketBySymbol, symbol)
  const chanData = [chanName, marketData]
  yield put(WSActions.subscribed({ chanID, chanData }))
}
