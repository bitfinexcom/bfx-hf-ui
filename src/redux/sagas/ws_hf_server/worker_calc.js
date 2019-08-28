import { delay, select  } from 'redux-saga/effects'

import { getSocket } from '../../selectors/ws_hf_server'
import onSendCalc from './on_send_calc'

const CALC_EVERY_MS = 5000

export default function * () {
  while (true) {
    const socket = yield select(getSocket)
    const isOffline = socket.status === 'offline'

    if (!isOffline) {
      yield onSendCalc()
    }

    yield delay(CALC_EVERY_MS)
  }
}
