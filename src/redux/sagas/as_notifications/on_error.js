import { put } from 'redux-saga/effects'
import { Notification } from 'bfx-api-node-models'
import _capitalize from 'lodash/capitalize'

import BFXDataActions from '../../actions/bfx_data'

export default function* (action = {}) {
  const { payload = [] } = action
  const [, msg] = payload

  const n = new Notification({
    mts: Date.now(),
    status: 'error',
    text: _capitalize(msg),
  })

  yield put(BFXDataActions.notification(n.serialize()))
}
