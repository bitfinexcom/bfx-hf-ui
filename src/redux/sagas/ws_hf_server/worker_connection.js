import { put, delay, select } from 'redux-saga/effects'
import Debug from 'debug'

import WSHFActions from '../../actions/ws_hf_server'
import { getSocket } from '../../selectors/ws_hf_server'

const WSS_URL = 'ws://localhost:10000'
const CHECK_CONNECTION_EVERY_MS = 4000
const debug = Debug('dtc:rx:s:ws-hf-server:worker-connection')

export default function * () {
  while (true) {
    const socket = yield select(getSocket)
    const isOffline = socket.status === 'offline'

    if (isOffline) {
      debug('attempting connection...')
      yield put(WSHFActions.connect(WSS_URL))
    }

    yield delay(CHECK_CONNECTION_EVERY_MS)
  }
}
