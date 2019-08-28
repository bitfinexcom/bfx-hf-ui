'use strict'

const _last = require('lodash/last')
const capture = require('capture')

const tradeTransformer = require('../transformers/trade')
const propagateData = require('../propagate_data')

module.exports = async (exa, channelData, chanID) => {
  const { client } = exa
  const [, market] = channelData
  const symbol = market.r
  let recentTrades

  try {
    recentTrades = await client.trades({ symbol })
  } catch (e) {
    capture.exception(e)
    return
  }

  const trade = _last(recentTrades)
  propagateData(exa, chanID, tradeTransformer(trade))
}
