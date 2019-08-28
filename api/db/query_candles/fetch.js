'use strict'

const _isFinite = require('lodash/isFinite')
const dbRL = require('db/pg_rate_limited')

module.exports = async ({
  table, market, start, end, limit, order = 'asc', orderBy = 'mts'
}) => {
  return dbRL((db) => {
    const q = db(table)
      .where(b => {
        let qb = b.where('symbol', market.r)

        if (_isFinite(start)) {
          qb = qb.andWhere('mts', '>=', start)
        }

        if (_isFinite(end)) {
          qb = qb.andWhere('mts', '<=', end)
        }

        return qb
      })
      .orderBy(orderBy, order)

    if (_isFinite(limit)) {
      q.limit(limit)
    }

    return q.select('*')
  })
}
