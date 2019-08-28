import { fork, takeEvery } from 'redux-saga/effects'
import WSHFTypes from '../../constants/ws_hf_server'

import messageQueueWorker from './worker_message_queue'
import connectionWorker from './worker_connection'
import calcWorker from './worker_calc'

import onConnected from './on_connected'
import onDisconnected from './on_disconnected'

export default function * () {
  yield takeEvery(WSHFTypes.BUFF_SEND, messageQueueWorker)
  yield takeEvery(WSHFTypes.FLUSH_QUEUE, messageQueueWorker)
  yield takeEvery(WSHFTypes.CONNECTED, onConnected)
  yield takeEvery(WSHFTypes.DISCONNECTED, onDisconnected)

  yield fork(connectionWorker)
  yield fork(calcWorker)
}
