import { delay } from 'redux-saga'
import { fork, put, call, select, takeEvery } from 'redux-saga/effects'
import WSBFXActions from '../actions/ws-bfx'
import WSBFXTypes from '../constants/ws-bfx'

const CHECK_EVERY = 4000
const WSS_URL = 'ws://localhost:9999'

function getState (state = {}) {
  const { socketBFX = {} } = state
  return socketBFX
}

function checkConnection (socket = {}) {
  const { status } = socket
  return status === 'offline'
}

function * onConnection () {
  yield put({ type: WSBFXTypes.FLUSH_QUEUE })
}

// place every outgoing message in a queue if connection is offline
let queue = []
function * messageQueueWorker (action = {}) {
  const {
    status
  } = yield select(getState)

  if (action.type !== WSBFXTypes.FLUSH_QUEUE) {
    queue = [...queue, action]
  }

  if (status !== 'online') {
    return
  }

  yield (queue || []).map(function * (queuedAction) {
    if (queuedAction.type === WSBFXTypes.BUFF_SEND) {
      queuedAction.type = WSBFXTypes.SEND
    }

    yield put(queuedAction)
  })

  queue = []
}

// reconnect if websocket connection is offline
export function * connectionSaga () {
  while (true) {
    const socket = yield select(getState)
    const isOffline = checkConnection(socket)

    if (isOffline) {
      const connectAction = WSBFXActions.connect(WSS_URL)
      yield put(connectAction)
    }

    yield call(delay, CHECK_EVERY)
  }
}

export function * messageQueueSaga () {
  yield takeEvery(WSBFXTypes.BUFF_SEND, messageQueueWorker)
  yield takeEvery(WSBFXTypes.FLUSH_QUEUE, messageQueueWorker)
}

export function * initSaga () {
  yield takeEvery(WSBFXTypes.CONNECTED, onConnection)
}

export function * WSBFXSaga () {
  yield fork(messageQueueSaga)
  yield fork(initSaga)
  yield fork(connectionSaga)
}
