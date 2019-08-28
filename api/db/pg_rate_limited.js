'use strict'

const PQ = require('p-queue').default
const db = require('db/pg')

const MAX_OPERATIONS = 10
const pq = new PQ({ concurrency: MAX_OPERATIONS })

module.exports = async (dbOperation) => {
  return pq.add(() => dbOperation(db))
}
