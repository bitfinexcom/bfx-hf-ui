process.env.DEBUG = 'bfx:hf:*'
process.env.DEBUG_TRACE = true

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const path = require('path')
const HFDB = require('bfx-hf-models')
const DataServer = require('bfx-hf-data-server')
const HFDBLowDBAdapter = require('bfx-hf-models-adapter-lowdb')
const { schema: HFDBBitfinexSchema } = require('bfx-hf-ext-plugin-bitfinex')
const DB_DIR = require('../public/lib/db_dir')

const DS_BFX_DB_FN = 'hf-bitfinex.json'
const DS_BFX_DB_PATH = path.join(DB_DIR, DS_BFX_DB_FN)

// TODO: Add logging

const dbBitfinex = new HFDB({
  schema: HFDBBitfinexSchema,
  adapter: HFDBLowDBAdapter({ dbPath: DS_BFX_DB_PATH }),
})

const dsBitfinex = new DataServer({
  db: dbBitfinex,
  port: 23521,
})

dsBitfinex.open()
