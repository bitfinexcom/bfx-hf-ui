'use strict'

const getClient = require('./get_client')

module.exports = (pool, exID) => {
  return !!getClient(pool, exID)
}
