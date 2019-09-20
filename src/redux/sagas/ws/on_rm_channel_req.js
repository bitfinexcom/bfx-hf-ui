import { select, put } from 'redux-saga/effects'

import WSActions from '../../actions/ws'
import { getChannelRequirements } from '../../selectors/ws'

export default function* (action = {}) {
  const { payload = {} } = action
  const { exID, channel = [] } = payload
  const req = yield select(getChannelRequirements, exID, channel)

  if (req !== 0) { // only unsubscribe when no requirements are left
    return
  }

  yield put(WSActions.unsubscribe(exID, channel))
}
