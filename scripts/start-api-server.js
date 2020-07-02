process.env.DEBUG = 'bfx:hf:*'
process.env.DEBUG_TRACE = true

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const startHFServer = require('bfx-hf-server')
const DB_DIR = require('../public/lib/db_dir')
const LOG_DIR = require('../public/lib/log_dir')

// TODO: Add logging

startHFServer({
  uiDBPath: `${DB_DIR}/ui.json`,
  algoDBPath: `${DB_DIR}/algos.json`,
  strategyDBDir: DB_DIR,
  strategyLogDir: LOG_DIR,
})
