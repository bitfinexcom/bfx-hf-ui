import { put } from 'redux-saga/effects'
import { Order, Notification } from 'bfx-api-node-models'
import _capitalize from 'lodash/capitalize'
import BFXDataActions from '../../actions/bfx_data'

export default function * (action = {}) {
  const { payload = {} } = action
  const { order } = payload
  const o = new Order(order).toJS()

  const n = new Notification({
    mts: Date.now(),
    status: 'success',
    text: `${_capitalize(o.type)} order for ${o.symbol} ${_capitalize(o.status)}`,
  })

  yield put(BFXDataActions.notification(n.serialize()))
}
