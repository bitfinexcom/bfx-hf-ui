import { put, select } from 'redux-saga/effects'
import A from '../../actions/ws_dtc_server'
import { getChannelByID } from '../../selectors/ws_dtc_server'

export default function * (action = {}) {
  const { payload = {} } = action
  const { updates = [] } = payload
  const tradeUpdates = {}

  // TODO: Buffer all updates (see trades below)
  for (let i = 0; i < updates.length; i += 1) {
    const { exID, chanID, data } = updates[i]
    const channel = yield select(getChannelByID, exID, chanID)
    const [type] = channel

    switch (type) {
      case 'ticker': {
        yield put(A.recvDataTicker(exID, channel, data))
        break
      }

      case 'trades': { // buffer trade updates
        if (!tradeUpdates[exID]) tradeUpdates[exID] = {}
        if (!tradeUpdates[exID][chanID]) tradeUpdates[exID][chanID] = []

        tradeUpdates[exID][chanID].push(data)
        break
      }

      case 'candles': {
        yield put(A.recvDataCandle(exID, channel, data))
        break
      }

      case 'book': {
        yield put(A.recvDataBook(exID, channel, data))
        break
      }

      default: {}
    }
  }

  const tradeExchanges = Object.keys(tradeUpdates)
  let exID
  let chanID

  for (let i = 0; i < tradeExchanges.length; i += 1) {
    exID = tradeExchanges[i]
    const exChannels = Object.keys(tradeUpdates[exID])

    for (let i = 0; i < exChannels.length; i += 1) {
      chanID = exChannels[i]
      const channel = yield select(getChannelByID, exID, chanID)

      tradeUpdates[exID][chanID].sort((a, b) => b.mts - a.mts)

      yield put(A.recvDataTrades(exID, channel, tradeUpdates[exID][chanID]))
    }
  }
}
