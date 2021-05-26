import { put, delay, select } from 'redux-saga/effects'
import _filter from 'lodash/filter'
import _includes from 'lodash/includes'
import _keys from 'lodash/keys'

import WSActions from '../../actions/ws'
import { getSockets } from '../../selectors/ws'

import WSTypes from '../../constants/ws'

const URLS_TO_IGNORE = [WSTypes.ALIAS_API_SERVER, WSTypes.ALIAS_DATA_SERVER]
const PING_CONNECTION_EVERY_MS = 30 * 1000
const data = { event: 'ping' }

export default function* () {
  while (true) {
    const sockets = yield select(getSockets)
    const keys = _filter(_keys(sockets), alias => !_includes(URLS_TO_IGNORE, alias))

    for (let i = 0; i < keys.length; ++i) {
      const alias = keys[i]
      yield put(WSActions.send({ data, alias }))
    }

    yield delay(PING_CONNECTION_EVERY_MS)
  }
}
