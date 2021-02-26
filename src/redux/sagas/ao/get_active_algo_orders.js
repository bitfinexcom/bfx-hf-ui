import { put, select } from 'redux-saga/effects'

import WSActions from '../../actions/ws'
import { getAuthToken } from '../../selectors/ws'

export default function* getActiveAlgoOrders() {
  const authToken = yield select(getAuthToken)
  yield put(WSActions.send(['get.active_algo_orders', authToken]))
}
