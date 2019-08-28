'use strict'

const _flatten = require('lodash/flatten')
const _reverse = require('lodash/reverse')

module.exports = (book = []) => {
  const bids = book.filter(pl => pl[2] > 0).map(pl => [pl[0], pl[2]])
  const asks = _reverse(book.filter(pl => pl[2] < 0).map(pl => [pl[0], pl[2]]))

  return _flatten([asks, bids])
}
