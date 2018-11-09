import axios from 'axios'
import { takeEvery, put, call, select } from 'redux-saga/effects'

axios.defaults.baseURL = 'http://localhost:9987'

function getState (state) {
  return state
}

function* onREST (action = {}) {
  const { data = {} } = yield select(getState)
  const { user } = data
  const {
    payload = {},
    meta = {},
  } = action

  try {
    const res = yield call(axios, {
      method: meta.method,
      url: meta.url,
      data: payload,

      ...(!user ? {} : {
        headers: {
          'api-token': user.apiToken,
          'api-user-id': user.apiID,
        }
      })
    })

    const { error, data } = res

    if (error) {
      throw new Error(error)
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
