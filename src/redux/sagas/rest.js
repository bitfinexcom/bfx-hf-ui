import axios from 'axios'
import _toUpper from 'lodash/toUpper'
import {
  takeEvery, put, call, select,
} from 'redux-saga/effects'

axios.defaults.baseURL = 'http://localhost:9987'

function getState(state) {
  return state
}

function getBFXFTType (meta = {}) {
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

function* onRESTSuccess(action = {}) {
  const {
    payload = {},
    meta = {},
  } = action

  const { handler, method } = meta

  yield put({
    type: `${handler}_${method}_RES`,
    payload,
    meta,
  })
}

function onRESTError() {
  // TODO:
}

export function* restSaga() {
  yield takeEvery('REST_SUCCESS', onRESTSuccess)
  yield takeEvery('REST_ERROR', onRESTError)
  yield takeEvery('REST', onREST)
}

export default restSaga
