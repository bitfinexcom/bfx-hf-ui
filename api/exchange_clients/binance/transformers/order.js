'use strict'

module.exports = (o = {}) => ([
  o.orderId,
  null, // gid
  o.newClientOrderId || o.clientOrderId,
  o.symbol,
  o.orderTime || o.time,
  (o.side === 'SELL' ? -1 : 1) * (o.quantity || ((+o.origQty) - (+o.executedQty))),
  (o.side === 'SELL' ? -1 : 1) * +(o.quantity || o.origQty),
  o.orderType || o.type,
  o.orderStatus || o.status,
  o.price
])
