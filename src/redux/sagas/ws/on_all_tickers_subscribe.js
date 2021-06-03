import { put, delay } from 'redux-saga/effects'
import Debug from 'debug'
import axios from 'axios'
import WSActions from '../../actions/ws'

const debug = Debug('hfui:rx:s:ws-hfui:on-all-tickers-subscribe')

const UPDATE_RATES_INTERVAL_MS = 10 * 1000 // 10s
const URL = 'https://api-pub.bitfinex.com/v2/tickers?symbols=ALL'

export default function* () {
  while (true) {
    let tickersData

    try {
      const response = yield axios.get(URL)
      tickersData = response.data
    } catch (err) {
      debug('failed to fetch tickers rates: %s', err.message)
      return
    }
    yield put(WSActions.setTickersData(tickersData))
    yield delay(UPDATE_RATES_INTERVAL_MS)
  }
}
