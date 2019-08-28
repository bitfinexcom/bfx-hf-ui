'use strict'

const _last = require('lodash/last')
const _isArray = require('lodash/isArray')
const tradeTransformer = require('../../transformers/trade')

module.exports = (exa, msg, channel) => {
  if (_isArray(_last(msg)[0]) || msg[1] === 'tu') {
    return [] // ignore snapshots & tu
  }

  return [tradeTransformer(_last(msg))]
}
