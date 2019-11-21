import { put, select } from 'redux-saga/effects'
import Debug from 'debug'

import A from '../../actions/ws'
import { getAllChannelRequirements } from '../../selectors/ws'
import {
  parseTickerKey, parseBookKey, parseTradesKey, parseCandlesKey,
  parseKeyChannelType,
} from '../../helpers/parse_channel_req_key'

const debug = Debug('hfui:rx:s:ws-hfui-server:on-reconnected')

export default function* () {
  const reqs = yield select(getAllChannelRequirements)
  const reqKeys = Object.keys(reqs)
  const keysRequiringConnection = reqKeys.filter(k => reqs[k] > 0)
  const channels = keysRequiringConnection.map((key) => {
    const type = parseKeyChannelType(key)

    switch (type) {
      case 'ticker': {
        return ['ticker', ...parseTickerKey(key)]
      }

      case 'book': {
        return ['book', ...parseBookKey(key)]
      }

      case 'trades': {
        return ['trades', ...parseTradesKey(key)]
      }

      case 'candles': {
        return ['candles', ...parseCandlesKey(key)]
      }

      default: {
        debug('warning: cannot restore unknown channel type %s', type)
        return null
      }
    }
  }).filter(c => c !== null)

  for (let i = 0; i < channels.length; i += 1) {
    debug('resubscribing to %j', channels[i])
    yield put(A.subscribe(channels[i]))
  }
}
