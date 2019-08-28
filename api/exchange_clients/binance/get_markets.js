'use strict'

const getExchangeInfo = require('./get_exchange_info')
const symbolTransformer = require('./transformers/symbol')

module.exports = async () => {
  return getExchangeInfo().then((res = {}) => {
    const { symbols = [] } = res
    return symbols.map(symbolTransformer)
  })
}
