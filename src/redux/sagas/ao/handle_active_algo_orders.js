import { put, select } from 'redux-saga/effects'

import WSActions from '../../actions/ws'
import { getAuthToken } from '../../selectors/ws'
import { showActiveOrdersModal } from '../../actions/ao'

export default function* handleActiveAlgoOrders({ payload }) {
  const {
    type,
    allOrders,
    selectedOrders,
    unselectedOrders,
  } = payload
  const authToken = yield select(getAuthToken)
  if (type === 'resume') {
    yield put(WSActions.send(['algo_order.remove', authToken, unselectedOrders]))
    yield put(WSActions.send(['algo_order.load', authToken, selectedOrders]))
  }
  if (type === 'cancel_all') {
    yield put(WSActions.send(['algo_order.remove', authToken, allOrders]))
  }
  yield put(showActiveOrdersModal(false))
}
