const fs = require('fs')
const path = require('path')
const LOG_DIR = require('./log_dir')
const forkScript = require('../util/fork_script')

const name = (scriptNames = []) => (
  scriptNames
    .map(scriptName => path.join(LOG_DIR, scriptName))
    .map(logPath => fs.openSync(logPath, 'a'))
    .map((stream, i) => forkScript(scriptNames[i], stream))
)

module.exports = name
