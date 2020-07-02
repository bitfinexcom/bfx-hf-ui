import { select, put } from 'redux-saga/effects'

import WSActions from '../../actions/ws'
import { getChannelRequirements } from '../../selectors/ws'

/**
 * Unsubscribes from the requested channel if it is no longer required
 *
 * @generator
 * @param {ReduxAction} action - action
 */
export default function* (action = {}) {
  const { payload = {} } = action
  const { exID, channel = [] } = payload
  const req = yield select(getChannelRequirements, exID, channel)

  if (req !== 0) { // only unsubscribe when no requirements are left
    return
  }

  yield put(WSActions.unsubscribe(exID, channel))
}
