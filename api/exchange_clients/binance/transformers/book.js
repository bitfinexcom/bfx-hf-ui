'use strict'

module.exports = (book = {}) => {
  const { bids = [], asks = [] } = book
  const transformed = []

  for (let i = asks.length - 1; i >= 0; i -= 1) {
    transformed.push([+asks[i].price, -1 * +asks[i].quantity])
  }

  for (let i = 0; i < bids.length; i += 1) {
    transformed.push([+bids[i].price, +bids[i].quantity])
  }

  return transformed
}
