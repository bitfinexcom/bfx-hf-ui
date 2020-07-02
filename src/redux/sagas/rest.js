import axios from 'axios'
import _toUpper from 'lodash/toUpper'
import _toLower from 'lodash/toLower'

import {
  takeEvery, put, call, select,
} from 'redux-saga/effects'

/**
 * @param {object} state - state object
 * @returns {object} state
 */
function getState(state) {
  return state
}

/**
 * @param {object} meta - REST request metadata
 * @param {string|null} meta.section - request section
 * @param {string|null} meta.subsection - request subsection
 * @returns {string} actionType
 */
function getBFXFTType(meta = {}) {
  const {
    section = null,
    subsection = null,
  } = meta

  const pre = (subsection === 'trading')
    ? 't'
    : 'f'

  return (section && subsection)
    ? _toUpper(`${pre}_${section}`)
    : '?'
}

/**
 * Performs a REST request via `axios`.
 *
 * @generator
 * @param {ReduxAction} action - action
 */
function* externalREST(action = {}) {
  const {
    meta = {},
  } = action
  const { url, method } = meta
  const { data } = yield axios[_toLower(method)](url)

  yield put({
    type: 'REST_SUCCESS',
    payload: data,
    meta,
  })
}

/**
 * @generator
 * @param {ReduxAction} action - action
 */
function* onREST(action = {}) {
  const { dataHF = {} } = yield select(getState)
  const { user } = dataHF
  const {
    payload = {},
    meta = {},
  } = action

  try {
    const res = yield call(axios, {
      method: meta.method || payload.method,
      url: meta.url || payload.path,
      data: payload.body || payload,
      params: payload.params,

      ...(!user ? {} : {
        headers: {
          'api-token': user.apiToken,
          'api-user-id': user.apiID,
        },
      }),
    })

    const { error, data } = res

    if (error) {
      throw new Error(error)
    }

    // bfxft pathway
    if (meta.section && meta.subsection) {
      const type = getBFXFTType(meta)
      const { symbol, pair } = meta

      if (type !== '?') {
        yield put({
          type: `${type}_MESSAGE`,
          payload: [0, type, data],
          channel: { symbol: symbol || pair },
          meta,
        })
      }
    }

    yield put({
      type: 'REST_SUCCESS',
      payload: data,
      meta,
    })
  } catch (error) {
    yield put({
      type: 'REST_ERROR',
      payload: error,
      meta,
    })
  }
}

/**
 * Pushes a new action to store received data.
 *
 * @generator
 * @param {ReduxAction} action - action
 */
function* onRESTSuccess(action = {}) {
  const {
    meta = {},
    payload = {},
  } = action
  const { handler, method } = meta

  yield put({
    type: `${handler}_${method}_RES`,
    payload,
    meta,
  })
}

/**
 * @todo fill in
 */
function onRESTError() {
  // TODO:
}

/**
 * Listens for REST actions to execute requests via `axios` and pass received
 * data along to the relevant receivers.
 *
 * @generator
 */
export function* restSaga() {
  yield takeEvery('REST_SUCCESS', onRESTSuccess)
  yield takeEvery('REST_ERROR', onRESTError)
  yield takeEvery('REST', onREST)
  yield takeEvery('REST_EXTERNAL', externalREST)
}

export default restSaga
