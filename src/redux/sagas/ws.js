import { delay } from 'redux-saga'
import { put, call, select, takeEvery } from 'redux-saga/effects'
import WSActions from '../actions/ws'
import WSTypes from '../constants/ws'

const CHECK_EVERY = 4000
const WSS_URL = 'ws://localhost:8899'

function getState (state = {}) {
  const { socket = {} } = state
  return socket
}

function checkConnection (socket = {}) {
  const { status } = socket
  return status === 'offline'
}

function * onConnection () {
  yield put({ type: 'FLUSH_QUEUE' })
}

// place every outgoing message in a queue if connection is offline
let queue = []
function * messageQueueWorker (action = {}) {
  const {
    status
  } = yield select(getState)

  if (action.type !== 'FLUSH_QUEUE') {
    queue = [...queue, action]
  }

  if (status !== 'online') {
    return
  }

  yield (queue || []).map(function * (queuedAction) {
    if (queuedAction.type === WSTypes.BUFF_SEND) {
      queuedAction.type = WSTypes.SEND
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
      const connectAction = WSActions.connect(WSS_URL)
      yield put(connectAction)
    }

    yield call(delay, CHECK_EVERY)
  }
}

export function * messageQueueSaga () {
  yield takeEvery(WSTypes.BUFF_SEND, messageQueueWorker)
  yield takeEvery('FLUSH_QUEUE', messageQueueWorker)
}

export function * initSaga () {
  yield takeEvery(WSTypes.CONNECTED, onConnection)
}
