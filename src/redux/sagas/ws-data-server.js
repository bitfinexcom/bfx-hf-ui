/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import { delay } from 'redux-saga'
import {
  fork, put, call, select, takeEvery,
} from 'redux-saga/effects'
import WSDSActions from '../actions/ws-data-server'
import WSDSTypes from '../constants/ws-data-server'

const CHECK_EVERY = 4000
const WSS_URL = 'ws://localhost:8899'

function getState(state = {}) {
  const { socketDS = {} } = state
  return socketDS
}

function checkConnection(socket = {}) {
  const { status } = socket
  return status === 'offline'
}

function* onConnection() {
  yield put({ type: WSDSTypes.FLUSH_QUEUE })
}

// place every outgoing message in a queue if connection is offline
let queue = []
function* messageQueueWorker(action = {}) {
  const {
    status,
  } = yield select(getState)

  if (action.type !== WSDSTypes.FLUSH_QUEUE) {
    queue = [...queue, action]
  }

  if (status !== 'online') {
    return
  }

  yield (queue || []).map(function* (queuedAction) {
    if (queuedAction.type === WSDSTypes.BUFF_SEND) {
      queuedAction.type = WSDSTypes.SEND
    }

    yield put(queuedAction)
  })

  queue = []
}

// reconnect if websocket connection is offline
export function* connectionSaga() {
  while (true) {
    const socket = yield select(getState)
    const isOffline = checkConnection(socket)

    if (isOffline) {
      const connectAction = WSDSActions.connect(WSS_URL)
      yield put(connectAction)
    }

    yield call(delay, CHECK_EVERY)
  }
}

export function* messageQueueSaga() {
  yield takeEvery(WSDSTypes.BUFF_SEND, messageQueueWorker)
  yield takeEvery(WSDSTypes.FLUSH_QUEUE, messageQueueWorker)
}

export function* initSaga() {
  yield takeEvery(WSDSTypes.CONNECTED, onConnection)
}

export function* WSDSSaga() {
  yield fork(messageQueueSaga)
  yield fork(initSaga)
  yield fork(connectionSaga)
}
