import { put, delay, select } from 'redux-saga/effects'
import Debug from 'debug'

import WSDTCActions from '../../actions/ws_dtc_server'
import { getSocket } from '../../selectors/ws_dtc_server'

const WSS_URL = process.env.REACT_APP_WSS_URL
const CHECK_CONNECTION_EVERY_MS = 10 * 1000
const debug = Debug('dtc:rx:s:ws-dtc:worker-connection')

export default function * () {
  while (true) {
    const socket = yield select(getSocket)
    const isOffline = socket.status === 'offline'

    if (isOffline) {
      debug('attempting connection...')
      yield put(WSDTCActions.connect(WSS_URL))
    }

    yield delay(CHECK_CONNECTION_EVERY_MS)
  }
}
