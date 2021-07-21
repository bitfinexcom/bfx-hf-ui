import { put } from 'redux-saga/effects'
import Debug from 'debug'
import _includes from 'lodash/includes'
import WSActions from '../../actions/ws'

const debug = Debug('hfui:rx:s:ntfc')

export default function* isAPIErrorNotification(action = {}) {
  const { payload = {} } = action
  const { notification = {} } = payload
  const { status, text } = notification

  if (status === 'error' && _includes(text, 'auth failed: apikey')) {
    debug('auth failed: wrong API keys')
    yield put(WSActions.authWrongAPIKeys(true))
    yield put(WSActions.authAPIValidating(false))
  }
  if (status === 'success' && _includes(text, 'Authenticated with Bitfinex')) {
    yield put(WSActions.authWrongAPIKeys(false))
    yield put(WSActions.authAPIValidating(false))
  }
  if (status === 'success' && _includes(text, 'API credentials saved for')) {
    yield put(WSActions.authWrongAPIKeys(false))
  }
}
