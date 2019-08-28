import { select, put } from 'redux-saga/effects'

import WSDTCActions from '../../actions/ws_dtc_server'
import { getChannelRequirements } from '../../selectors/ws_dtc_server'

export default function * (action = {}) {
  const { payload = {} } = action
  const { exID, channel = [] } = payload
  const req = yield select(getChannelRequirements, exID, channel)

  if (req !== 0) { // only unsubscribe when no requirements are left
    return
  }

  yield put(WSDTCActions.unsubscribe(exID, channel))
}
