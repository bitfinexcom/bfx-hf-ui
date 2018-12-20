import { fork, takeEvery, takeLatest, put } from 'redux-saga/effects'

const TICKERS_SECTION = 'tickers_section'

function* processRequestAllTickers() {
  yield takeLatest('REQUEST_ALL_TICKERS', function* () {
    yield put({
      type: 'REST',

      meta: {
        method: 'GET',
        url: '/v2/tickers?symbols=ALL',
        section: TICKERS_SECTION,
      },

      payload: {}
    })
  })
}

function* processRequestAllTickersSuccess() {
  yield takeEvery('REST_SUCCESS', function* (action) {
    const { meta = {}, payload = {} } = action
    const { section } = meta
    if (section === TICKERS_SECTION) {
      yield put({
        type: 'TICKER_REST_UPDATE',
        payload,
      })
    }
  })
}

function* tickersSaga() {
  yield fork(processRequestAllTickers)
  yield fork(processRequestAllTickersSuccess)
}

export default tickersSaga
