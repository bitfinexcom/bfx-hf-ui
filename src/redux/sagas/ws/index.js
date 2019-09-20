import { fork, takeEvery } from 'redux-saga/effects'
import t from '../../constants/ws'

import messageQueueWorker from './worker_message_queue'
import connectionWorker from './worker_connection'
import { updateWorker } from './worker_flush_exchange_data'

import onConnected from './on_connected'
import onReconnected from './on_reconnected'
import onDisconnected from './on_disconnected'
import onSubscribe from './on_subscribe'
import onUnsubscribe from './on_unsubscribe'
import onAddChannelRequirement from './on_add_channel_req'
import onRemoveChannelRequirement from './on_rm_channel_req'
import onFlushDataFromExchange from './on_flush_data_from_exchange'
import onBufferDataFromExchange from './on_buffer_data_from_exchange'

export default function* () {
  yield takeEvery(t.BUFF_SEND, messageQueueWorker)
  yield takeEvery(t.FLUSH_QUEUE, messageQueueWorker)
  yield takeEvery(t.CONNECTED, onConnected)
  yield takeEvery(t.RECONNECTED, onReconnected)
  yield takeEvery(t.DISCONNECTED, onDisconnected)
  yield takeEvery(t.ADD_CHANNEL_REQUIREMENT, onAddChannelRequirement)
  yield takeEvery(t.REMOVE_CHANNEL_REQUIREMENT, onRemoveChannelRequirement)
  yield takeEvery(t.UNSUBSCRIBE, onUnsubscribe)
  yield takeEvery(t.SUBSCRIBE, onSubscribe)
  yield takeEvery(t.FLUSH_DATA_FROM_EXCHANGE, onFlushDataFromExchange)
  yield takeEvery(t.BUFFER_DATA_FROM_EXCHANGE, onBufferDataFromExchange)

  yield fork(connectionWorker)
  yield fork(updateWorker)
}
