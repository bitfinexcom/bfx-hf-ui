import { put } from 'redux-saga/effects'
import WSActions from '../../actions/ws'

/**
 * Clears local channel subscription data and triggers a notification
 *
 * @generator
 */
export default function* () {
  yield put(WSActions.clearChannels())
  yield put(WSActions.recvNotification({
    mts: Date.now(),
    status: 'error',
    text: 'Disconnected from websocket server',
  }))
}
