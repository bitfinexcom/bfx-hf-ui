process.env.DEBUG = 'bfx:hf:*'

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const startHFServer = require('bfx-hf-server')

startHFServer({
  dbPath: `${__dirname}/../db/db.json`,
})
