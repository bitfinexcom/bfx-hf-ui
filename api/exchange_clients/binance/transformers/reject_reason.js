'use strict'

const MAP = {
  NONE: 'no reason',
  UNKNOWN_INSTRUMENT: 'unknown instrument',
  MARKET_CLOSED: 'market is closed',
  PRICE_QTY_EXCEED_HARD_LIMITS: 'price/quantity exceed hard limits',
  UNKNOWN_ORDER: 'unknown order type',
  DUPLICATE_ORDER: 'duplicate order',
  UNKNOWN_ACCOUNT: 'unkown account',
  INSUFFICIENT_BALANCE: 'insufficient balance',
  ACCOUNT_INACTIVE: 'account inactive',
  ACCOUNT_CANNOT_SETTLE: 'account cannot settle',
}

module.exports = reason => MAP[reason] || 'unknown reason'
