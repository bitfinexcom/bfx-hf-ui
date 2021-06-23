import { put } from 'redux-saga/effects'
import Debug from 'debug'
import axios from 'axios'
import marketActions from '../../actions/market'

const debug = Debug('hfui:rx:s:market-hfui:getting perps names')
const URL = 'http://localhost:45001/v2/conf/pub:map:pair:sym'

export default function* getPerpsNames() {
  try {
    const { data } = yield axios.get(URL)
    yield put(marketActions.setPerpsNames(data))
  } catch (err) {
    debug('failed to fetch perps names: %s', err.message)
  }
}
