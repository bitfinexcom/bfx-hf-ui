import { put, select } from 'redux-saga/effects'

import WSActions from '../../actions/ws'
import { getAuthToken } from '../../selectors/ws'

export default function* handleActiveAlgoOrders({ payload }) {
  const { type, orders } = payload
  const authToken = yield select(getAuthToken)
  yield put(WSActions.send([type, authToken, orders]))
}
