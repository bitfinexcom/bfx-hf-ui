import { put } from 'redux-saga/effects'
import { v4 } from 'uuid'
import WSActions from '../../actions/ws'

export default function* () {
  yield put(WSActions.clearChannels())
  yield put(WSActions.recvNotification({
    mts: Date.now(),
    status: 'error',
    text: 'Disconnected from websocket server',
    cid: v4(),
  }))
}
