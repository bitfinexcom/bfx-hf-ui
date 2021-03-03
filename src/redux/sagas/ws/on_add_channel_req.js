import { select, put } from 'redux-saga/effects'

import { getChannelRequirements } from '../../selectors/ws'
import WSActions from '../../actions/ws'

export default function* (action = {}) {
  const { payload = {} } = action
  const { exID, channel = [] } = payload
  const req = yield select(getChannelRequirements, exID, channel)
  if (req > 1) {
    return
  }

  yield put(WSActions.subscribe(exID, channel))
}
