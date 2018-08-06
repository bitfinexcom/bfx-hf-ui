import { delay } from 'redux-saga'
import { take, put, call, select, takeEvery } from 'redux-saga/effects'
import WSActions from '../actions/ws'
import WSTypes from '../constants/ws'

const CHECK_EVERY = 4000
const WSS_URL = 'ws://localhost:8899'

function getState(state) {
  return state
}

function checkConnection(socket = {}) {
  const { status } = socket
  return status === 'offline'
}

function* onConnection() {
  // yield put(WSActions.send(['get.candle_chunks']))
}

// place every outgoing message in a queue if connection is offline
let queue = []
function* messageQueueWorker(action = {}) {
  const {
    status,
  } = yield select(getState)

  yield queue = [...queue, action]

  if (status !== 'online') {
    return
  }

  yield (queue || []).map(function* (queuedAction) {
    yield put(queuedAction)
  })

  queue = []
}

// reconnect if websocket connection is offline
export function* connectionSaga() {
  while (true) {
    const { socket } = yield select(getState)
    const isOffline = checkConnection(socket)

    if (isOffline) {
      const connectAction = WSActions.connect(WSS_URL)
      yield put(connectAction)
    }

    yield call(delay, CHECK_EVERY)
  }
}

export function* messageQueueSaga() {
  yield take(WSTypes.SEND, messageQueueWorker)
}

export function* initSaga() {
  yield takeEvery(WSTypes.CONNECTED, onConnection)
}
