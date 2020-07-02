import { put, select } from 'redux-saga/effects'
import _last from 'lodash/last'
import Debug from 'debug'

import { getChannel } from '../../selectors/ws'
import WSActions from '../../actions/ws'

const debug = Debug('hfui:rx:s:ws-hfui-server:on-sub')

/**
 * Sends the necessary subscribe packet
 *
 * @generator
 * @param {ReduxAction} action - action
 */
export default function* (action = {}) {
  const { payload = {} } = action
  const { exID, channel = [] } = payload
  const existingChannel = yield select(getChannel, channel)

  if (!existingChannel) {
    debug('subscribing to %s %s on %s', channel[0], _last(channel).uiID, exID)

    yield put(WSActions.send(['subscribe', exID, channel]))
  }
}
