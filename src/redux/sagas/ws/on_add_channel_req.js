import { select, put } from 'redux-saga/effects'

import { getChannelRequirements } from '../../selectors/ws'
import WSActions from '../../actions/ws'

/**
 * Subscribes to the requested WS channel if it was not previously required
 *
 * @generator
 * @param {ReduxAction} action - action
 */
export default function* (action = {}) {
  const { payload = {} } = action
  const { exID, channel = [] } = payload
  const req = yield select(getChannelRequirements, exID, channel)

  if (req !== 1) { // only subscribe on the first requirement
    return
  }

  yield put(WSActions.subscribe(exID, channel))
}
