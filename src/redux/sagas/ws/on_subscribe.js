import { put, select } from 'redux-saga/effects'
import _last from 'lodash/last'
import Debug from 'debug'

import { getChannel } from '../../selectors/ws'
import WSActions from '../../actions/ws'
import WSTypes from '../../constants/ws'

const debug = Debug('hfui:rx:s:ws-hfui-server:on-sub')

export default function* (action = {}) {
  const { payload = {} } = action
  const { exID, channel = [] } = payload
  const { wsID } = channel[1]
  const channelName = channel[0]
  const existingChannel = yield select(getChannel, channel)

  if (!existingChannel) {
    debug('subscribing to %s %s on %s', channel[0], _last(channel).uiID, exID)

    if (channelName === 'ticker') {
      // Temporary, until other channels will be migrated to pub api sub
      yield put(WSActions.send({
        alias: WSTypes.ALIAS_PUB_WS_API,
        data: {
          symbol: wsID,
          event: 'subscribe',
          channel: channelName,
        },
      }))
    } else {
      yield put(WSActions.send(['subscribe', exID, channel]))
    }
  }
}
