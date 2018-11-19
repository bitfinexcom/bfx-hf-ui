import { delay } from 'redux-saga'
import { fork, put, call, select, takeEvery } from 'redux-saga/effects'
import WSHFActions from '../actions/ws-hf-server'
import WSHFTypes from '../constants/ws-hf-server'

const CHECK_EVERY = 4000
const WSS_URL = 'ws://localhost:10000'

function getState (state = {}) {
  const { socketHF = {} } = state
  return socketHF
}

function checkConnection (socket = {}) {
  const { status } = socket
  return status === 'offline'
}

function * onConnection () {
  yield put({ type: WSHFTypes.FLUSH_QUEUE })
}

// place every outgoing message in a queue if connection is offline
let queue = []
function * messageQueueWorker (action = {}) {
  const {
    status
  } = yield select(getState)

  if (action.type !== WSHFTypes.FLUSH_QUEUE) {
    queue = [...queue, action]
  }

  if (status !== 'online') {
    return
  }

  yield (queue || []).map(function * (queuedAction) {
    if (queuedAction.type === WSHFTypes.BUFF_SEND) {
      queuedAction.type = WSHFTypes.SEND
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
      const connectAction = WSHFActions.connect(WSS_URL)
      yield put(connectAction)
    }

    yield call(delay, CHECK_EVERY)
  }
}

export function * messageQueueSaga () {
  yield takeEvery(WSHFTypes.BUFF_SEND, messageQueueWorker)
  yield takeEvery(WSHFTypes.FLUSH_QUEUE, messageQueueWorker)
}

export function * initSaga () {
  yield takeEvery(WSHFTypes.CONNECTED, onConnection)
}

export function * WSHFSaga () {
  yield fork(messageQueueSaga)
  yield fork(initSaga)
  yield fork(connectionSaga)
}
