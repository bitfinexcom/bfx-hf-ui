import { put, delay, select } from 'redux-saga/effects'
import Debug from 'debug'

import WSActions from '../../actions/ws'
import { getSocket } from '../../selectors/ws'

import WSTypes from '../../constants/ws'

const WSS_URL = process.env.REACT_APP_WSS_URL
const DS_URL = process.env.REACT_APP_DS_URL
const CHECK_CONNECTION_EVERY_MS = 10 * 1000
const debug = Debug('hfui:rx:s:ws-hfui:worker-connection')

export default function* () {
  while (true) {
    const socket = yield select(getSocket)
    const isOffline = socket.status === 'offline'

    if (isOffline) {
      debug('attempting connection...')
      yield put(WSActions.connect(WSTypes.ALIAS_API_SERVER, WSS_URL))
      yield put(WSActions.connect(WSTypes.ALIAS_DATA_SERVER, DS_URL))
    }

    yield delay(CHECK_CONNECTION_EVERY_MS)
  }
}
