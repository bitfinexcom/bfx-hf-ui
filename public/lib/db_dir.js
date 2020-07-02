const fs = require('fs')
const os = require('os')

const DB_DIR = `${os.homedir()}/,.config/hfui`

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true })

  console.log(`Created DB directory: ${DB_DIR}`)
}

module.exports = DB_DIR
