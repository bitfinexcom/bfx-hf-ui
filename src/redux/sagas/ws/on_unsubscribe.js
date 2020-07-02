import { put } from 'redux-saga/effects'
import _last from 'lodash/last'
import Debug from 'debug'

import WSActions from '../../actions/ws'

const debug = Debug('hfui:rx:s:ws-hfui-server:on-unsub')

/**
 * Sends the necessary unsubscribe packet
 *
 * @generator
 * @param {ReduxAction} action - action
 */
export default function* (action = {}) {
  const { payload = {} } = action
  const { exID, chanData } = payload
  const [type] = chanData

  debug(
    'unsubscribing from channel %s %s on %s',
    chanData[0], _last(chanData).uiID, exID,
  )

  yield put(WSActions.send(['unsubscribe', exID, chanData]))

  switch (type) {
    case 'trades': {
      yield put(WSActions.purgeDataTrades(exID, chanData))
      break
    }

    case 'candles': {
      yield put(WSActions.purgeDataCandles(exID, chanData))
      break
    }

    case 'book': {
      yield put(WSActions.purgeDataBook(exID, chanData))
      break
    }

    default: {
      break
    }
  }
}
