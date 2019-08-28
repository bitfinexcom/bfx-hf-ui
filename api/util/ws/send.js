'use strict'

module.exports = (ws, msg) => {
  ws.send(JSON.stringify(msg))
}
