import { put } from 'redux-saga/effects'
import axios from 'axios'
import Debug from 'debug'

import marketActions from '../../actions/market'

const debug = Debug('hfui:rx:s:market-hfui:getting CCY full names')
const URL = 'http://localhost:45001/v2/conf/pub:map:currency:label'

export default function* () {
  try {
    const { data } = yield axios.get(URL)
    yield put(marketActions.setCCYFullNames(data))
  } catch (err) {
    debug('failed to fetch ccy full names: %s', err.message)
  }
}
