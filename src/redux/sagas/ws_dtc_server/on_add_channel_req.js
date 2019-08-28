import { select, put } from 'redux-saga/effects'

import { getChannelRequirements } from '../../selectors/ws_dtc_server'
import WSDTCActions from '../../actions/ws_dtc_server'

export default function * (action = {}) {
  const { payload = {} } = action
  const { exID, channel = [] } = payload
  const req = yield select(getChannelRequirements, exID, channel)

  if (req !== 1) { // only subscribe on the first requirement
    return
  }

  yield put(WSDTCActions.subscribe(exID, channel))
}
