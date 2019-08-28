'use strict'

require('dotenv').config()

process.env.DEBUG = '*'

const debug = require('debug')('dtc:api:worker:ex-meta-sync')
const worker = require('workers/ex-meta-sync')

const { EXA_META_SYNC_INTERVAL_H } = process.env

debug('started with sync interval %d hour(s)', EXA_META_SYNC_INTERVAL_H)

worker(EXA_META_SYNC_INTERVAL_H * 60 * 60 * 1000)
