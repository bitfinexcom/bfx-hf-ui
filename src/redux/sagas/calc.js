import _get from 'lodash/get'
import _filter from 'lodash/filter'
import { delay } from 'redux-saga'
import { put, call, takeEvery, select } from 'redux-saga/effects'
import { getCurrentPair, getCurrentCcy } from 'bfx-ui-components/dist/var/utils'
import { CALC_SEND_INTERVAL } from 'bfx-ui-components/dist/var/config'

import WSHFTypes from '../constants/ws-hf-server'

const reqChannels = {
  margin: true,
  funding: true,
  positions: false,
  wallet: false,
}

function calcAddSaga(action) {
  const { payload = {} } = action
  reqChannels[payload] = true
}

function calcRemoveSaga(action) {
  const { payload = {} } = action
  reqChannels[payload] = false
}

function getChannels(state) {
  const pair = getCurrentPair(state)
  const ccy = getCurrentCcy(state, { noPrefix: true })
  const { margin, funding } = reqChannels

  return _filter([
    margin && ['margin_base'],
    margin && [`margin_sym_${pair}`],
    funding && [`funding_sym_${ccy}`],
  ])
}

function* calcSaga() {
  yield takeEvery('CALC_ADD', calcAddSaga)
  yield takeEvery('CALC_REMOVE', calcRemoveSaga)

  while (true) {
    const isAuthenticated = yield select((state) => {
      return _get(state, 'socket.auth.status') === 'OK'
    })

    const state = yield select()
    const channels = getChannels(state)

    if (isAuthenticated && channels.length) {
      yield put({
        type: WSHFTypes.CALC,
        payload: {
          channels
        },
      })
    }

    yield call(delay, CALC_SEND_INTERVAL)
  }
}

export default calcSaga
