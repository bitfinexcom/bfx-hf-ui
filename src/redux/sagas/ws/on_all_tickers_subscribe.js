import { put, delay } from 'redux-saga/effects'
import Debug from 'debug'
import axios from 'axios'
import WSActions from '../../actions/ws'

const debug = Debug('hfui:rx:s:ws-hfui:on-all-tickers-subscribe')

const UPDATE_RATES_INTERVAL_MS = 10 * 1000 // 10s
const URL = 'http://localhost:45001/v2/tickers?symbols=ALL'

export default function* () {
  while (true) {
    try {
      const { data } = yield axios.get(URL)
      yield put(WSActions.setTickersData(data))
    } catch (err) {
      debug('failed to fetch tickers rates: %s', err.message)
    }
    yield delay(UPDATE_RATES_INTERVAL_MS)
  }
}
