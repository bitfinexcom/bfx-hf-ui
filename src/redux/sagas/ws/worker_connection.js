import { put, delay, select } from 'redux-saga/effects'
import Debug from 'debug'

import WSActions from '../../actions/ws'
import { getSocket } from '../../selectors/ws'

const WSS_URL = process.env.REACT_APP_WSS_URL
const CHECK_CONNECTION_EVERY_MS = 10 * 1000
const debug = Debug('hfui:rx:s:ws-hfui:worker-connection')

/**
 * Connects to the local `bfx-hf-server` instance if offline, on an interval.
 *
 * @generator
 */
export default function* () {
  while (true) {
    const socket = yield select(getSocket)
    const isOffline = socket.status === 'offline'

    if (isOffline) {
      debug('attempting connection...')
      yield put(WSActions.connect(WSS_URL))
    }

    yield delay(CHECK_CONNECTION_EVERY_MS)
  }
}
