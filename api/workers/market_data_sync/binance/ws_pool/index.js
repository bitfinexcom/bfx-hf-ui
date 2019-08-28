'use strict'

require('bfx-hf-util/lib/catch_uncaught_errors')
const childProcess = require('child_process')
const debug = require('debug')('dtc:api:workers:market-data-sync:binance:ws-pool')

const { BINANCE_WORKER_SOCKETS_PER_PROC } = process.env
const workers = [] // [[process, nSockets]]

const findFreeWorker = () => workers.find(w => (
  w[1] < +BINANCE_WORKER_SOCKETS_PER_PROC
))

const spawnWorker = () => {
  const process = childProcess.fork(`${__dirname}/worker`)
  const worker = [process, 0]
  workers.push(worker)

  debug('forked worker')

  return worker
}

const addSyncTask = (symbol, tf) => {
  const existingWorker = findFreeWorker()
  const worker = existingWorker
    ? existingWorker
    : spawnWorker()

  worker[0].send({ symbol, tf })
  worker[1] += 1
}

module.exports = { addSyncTask }
