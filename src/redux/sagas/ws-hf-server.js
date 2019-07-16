import { delay } from 'redux-saga'
import { put, call, select, takeEvery } from 'redux-saga/effects'
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

export function * WSHFSaga () {
  yield takeEvery(WSHFTypes.BUFF_SEND, messageQueueWorker)
  yield takeEvery(WSHFTypes.FLUSH_QUEUE, messageQueueWorker)
  yield takeEvery(WSHFTypes.CONNECTED, onConnection)

  while (true) {
    const socket = yield select(getState)
    const isOffline = checkConnection(socket)

    if (isOffline) {
      yield put(WSHFActions.connect(WSS_URL))
    }

    yield call(delay, CHECK_EVERY)
  }
}
