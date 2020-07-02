const path = require('path')
const _merge = require('lodash/merge')
const { fork } = require('child_process')

const SCRIPT_PATH = path.join(__dirname, '../../scripts')
const FORK_OPTS = { env: { ELECTRON_RUN_AS_NODE: '1' } }

const forkScript = (scriptName, stream, args = []) => {
  const stdio = [null, stream, stream, 'ipc']
  const name = path.join(SCRIPT_PATH, scriptName)

  return fork(name, args, _merge(FORK_OPTS, { stdio }))
}

module.exports = forkScript
