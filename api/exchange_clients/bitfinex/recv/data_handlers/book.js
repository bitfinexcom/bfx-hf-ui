'use strict'

const _last = require('lodash/last')
const _isArray = require('lodash/isArray')
const { OrderBook } = require('bfx-api-node-models')
const bookTransformer = require('../../transformers/book')

const BOOK_PACKET_SEND_INTERVAL_MS = 1000

module.exports = (exa, msg, channel) => {
  const { books, lastBookPacketSent } = exa

  if (_isArray(_last(msg)[0])) {
    books[channel.symbol] = _last(msg)
  } else {
    OrderBook.updateArrayOBWith(books[channel.symbol], _last(msg))
  }

  const lastSend = lastBookPacketSent[channel.symbol]

  if (!lastSend || Date.now() > lastSend + BOOK_PACKET_SEND_INTERVAL_MS) {
    lastBookPacketSent[channel.symbol] = Date.now()

    return [['full', bookTransformer(books[channel.symbol])]]
  }

  return []
}
