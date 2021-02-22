import { put, select } from 'redux-saga/effects'

import WSActions from '../../actions/ws'
import { getAuthToken } from '../../selectors/ws'
import { showActiveOrdersModal } from '../../actions/ao'

export default function* handleActiveAlgoOrders({ payload }) {
  const { type, selectedOrders, unselectedOrders } = payload
  const authToken = yield select(getAuthToken)
  if (type === 'resume') {
    yield put(WSActions.send(['algo_order.remove', authToken, unselectedOrders]))
    yield put(WSActions.send(['algo_order.load', authToken, selectedOrders]))
  }
  if (type === 'cancel') {
    yield put(WSActions.send(['algo_order.remove', authToken, selectedOrders]))
    yield put(WSActions.send(['algo_order.load', authToken, unselectedOrders]))
  }
  yield put(showActiveOrdersModal(false))
}
