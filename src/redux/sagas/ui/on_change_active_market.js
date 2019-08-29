import { put } from 'redux-saga/effects'
import Debug from 'debug'
import MarketActions from '../../actions/market'

const debug = Debug('dtc:rx:s:ui')

export default function* onChangeActiveMarket(action = {}) {
  const { payload = {} } = action
  const { market } = payload

  debug('switching market subscriptions to %j', market)
  yield put(MarketActions.changeSubscriptions(market))
}
