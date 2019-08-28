'use strict'

const tickerTransformer = require('../transformers/ticker')
const propagateData = require('../propagate_data')

module.exports = (exa, chanID, ticker) => {
  propagateData(exa, chanID, tickerTransformer(ticker))
}
