'use strict'

const _last = require('lodash/last')
const tickerTransformer = require('../../transformers/ticker')

module.exports = (exa, msg, channel) => {
  return [tickerTransformer(_last(msg))]
}
