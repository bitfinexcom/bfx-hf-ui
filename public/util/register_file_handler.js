const { protocol } = require('electron')
const path = require('path')

/**
 * @todo propagate error to UI, log goes unseen
 */
const registerFileURLHandler = (onError = console.error) => {
  protocol.interceptFileProtocol('file', (request, callback) => {
    const { url } = request
    const fileURL = url.substr(7)
    const filePath = path.normalize(__dirname, '../../', fileURL)

    callback({ path: filePath })
  }, onError)
}

module.exports = registerFileURLHandler
