import { put, select } from 'redux-saga/effects'
import _last from 'lodash/last'
import Debug from 'debug'

import { getChannel } from '../../selectors/ws'
import WSActions from '../../actions/ws'

const debug = Debug('hfui:rx:s:ws-hfui-server:on-unsub')

export default function* (action = {}) {
  const { payload = {} } = action
  const { exID, chanData } = payload
  const existingChannel = yield select(getChannel, exID, chanData)

  if (existingChannel) {
    debug(
      'unsubscribing from channel %s %s on %s',
      chanData[0], _last(chanData).u, exID,
    )

    yield put(WSActions.send(['unsubscribe', exID, chanData]))
  }
}
