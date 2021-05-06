import { put, select } from 'redux-saga/effects'
import _isNull from 'lodash/isNull'

import A from '../../actions/ws'
import { getChannelByID } from '../../selectors/ws'
import { prepareTickerData } from '../../helpers/prepare_pub_sub_data'

export default function* (action = {}) {
  const { payload = {} } = action
  const { updates = [] } = payload
  const tradeUpdates = {}

  // TODO: Buffer all updates (see trades below)
  for (let i = 0; i < updates.length; i += 1) {
    const {
      chanID,
      data,
      rawData,
    } = updates[i]
    const channel = yield select(getChannelByID, chanID)
    if (!channel) continue // eslint-disable-line

    const [type] = channel

    let preparedData
    if (!_isNull(rawData) && type === 'ticker') {
      preparedData = prepareTickerData(rawData)
    } else {
      preparedData = data
    }

    switch (type) {
      case 'ticker': {
        yield put(A.recvDataTicker(channel, preparedData))
        break
      }

      case 'trades': { // buffer trade updates
        if (!tradeUpdates[chanID]) tradeUpdates[chanID] = []

        tradeUpdates[chanID].push(preparedData)
        break
      }

      case 'book': {
        yield put(A.recvDataBook(channel, preparedData))
        break
      }

      default: {
        break
      }
    }
  }

  const tradeExchanges = Object.keys(tradeUpdates)
  let chanID

  for (let i = 0; i < tradeExchanges.length; i += 1) {
    const exChannels = Object.keys(tradeUpdates)

    for (let j = 0; j < exChannels.length; j += 1) {
      chanID = exChannels[j]
      const channel = yield select(getChannelByID, chanID)

      tradeUpdates[chanID].sort((a, b) => b.mts - a.mts)

      yield put(A.recvDataTrades(channel, tradeUpdates[chanID]))
    }
  }
}
