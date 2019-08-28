'use strict'

const knex = require('knex')
const pg = require('pg')
const PG_DECIMAL_OID = 1700
const PG_BIGINT_OID = 20

pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat)
pg.types.setTypeParser(PG_BIGINT_OID, 'text', parseInt)

// TODO: Extract?
const { PSQL_CONNECTION_DTC } = process.env

const db = knex({
  client: 'pg',
  acquireConnectionTimeout: 10 * 1000,
  connection: PSQL_CONNECTION_DTC,
  pool: {
    min: 1,
    max: 10
  }
})

module.exports = db
