const fs = require('fs')
const os = require('os')

const LOG_DIR = `${os.tmpdir()}/hfui`

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true })

  console.log(`Created log directory: ${LOG_DIR}`)
}

module.exports = LOG_DIR
