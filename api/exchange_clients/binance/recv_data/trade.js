'use strict'

const tradeTransformer = require('../transformers/trade')
const propagateData = require('../propagate_data')

module.exports = (exa, chanID, trade) => {
  propagateData(exa, chanID, tradeTransformer(trade))
}
