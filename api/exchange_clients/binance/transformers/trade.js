'use strict'

module.exports = (u = {}) => ({
  price: +u.price,
  amount: +(u.quantity || u.qty),
  mts: u.time || u.eventTime
})
