import { put } from 'redux-saga/effects'
import { Order, Notification } from 'bfx-api-node-models'
import BFXDataActions from '../../actions/bfx_data'

export default function* (action = {}) {
  const { payload = {} } = action
  const { order } = payload
  const o = new Order(order).toJS()

  const n = new Notification({
    mts: Date.now(),
    status: 'success',
    text: `Created ${o.type.toLowerCase()} order for ${o.symbol} ${o.amount} @ ${o.price}`,
  })

  yield put(BFXDataActions.notification(n.serialize()))
}
