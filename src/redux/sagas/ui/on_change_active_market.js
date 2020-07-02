import { put } from 'redux-saga/effects'
import Debug from 'debug'
import MarketActions from '../../actions/market'

const debug = Debug('hfui:rx:s:ui')

/**
 * Switches channel subscriptions to the newly active market, unsubscribing
 * from the previous if necessary.
 *
 * @generator
 * @param {ReduxAction} action - action
 */
export default function* onChangeActiveMarket(action = {}) {
  const { payload = {} } = action
  const { market } = payload

  debug('switching market subscriptions to %j', market)
  yield put(MarketActions.changeSubscriptions(market))
}
