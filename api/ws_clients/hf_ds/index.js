'use strict'

const nonce = require('util/nonce')
const WSClient = require('ws_client')

const onDataCandles = require('./on_data_candles')
const onDataSyncStart = require('./on_data_sync_start')
const onDataSyncEnd = require('./on_data_sync_end')

module.exports = class HFDSClient extends WSClient {
  constructor ({ url, id, symbolTransformer = s => s }) {
    super({
      url,
      debugName: `hf-ds-${id}`,
      msgHandlers: {
        'data.candles': onDataCandles,
        'data.sync.start': onDataSyncStart,
        'data.sync.end': onDataSyncEnd
      }
    })

    this.candleRequests = {} // [reqID]: ws
    this.candlePromises = {} // [reqID]: p
    this.symbolTransformer = symbolTransformer
  }

  getCandles (ws, { exID, symbol, tf, start, end }, uiMarket) {
    const reqID = `${nonce()}-${uiMarket}`
    const finalSymbol = this.symbolTransformer(symbol)

    this.candleRequests[reqID] = ws
    this.send(['get.candles', exID, finalSymbol, tf, 'trade', start, end, reqID])

    return new Promise((resolve) => {
      this.candlePromises[reqID] = resolve
    })
  }
}
