import { put } from 'redux-saga/effects'
import _last from 'lodash/last'
import Debug from 'debug'

import WSActions from '../../actions/ws'

const debug = Debug('hfui:rx:s:ws-hfui-server:on-unsub')

export default function* (action = {}) {
  const { payload = {} } = action
  const { chanData } = payload
  const [type] = chanData

  debug(
    'unsubscribing from channel %s %s on %s',
    chanData[0], _last(chanData).uiID,
  )

  yield put(WSActions.send(['unsubscribe', 'bitfinex', chanData]))

  switch (type) {
    case 'trades': {
      yield put(WSActions.purgeDataTrades(chanData))
      break
    }

    // case 'candles': {
    //   yield put(WSActions.purgeDataCandles(chanData))
    //   break
    // }

    case 'book': {
      yield put(WSActions.purgeDataBook(chanData))
      break
    }

    default: {
      break
    }
  }
}
