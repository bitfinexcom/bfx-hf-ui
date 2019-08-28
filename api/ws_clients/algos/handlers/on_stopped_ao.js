'use strict'

const { notifySuccess } = require('util/ws/notify')
const send = require('util/ws/send')

module.exports = (client, msg) => {
  const { userWS } = client
  const [,, exID, gid] = msg

  notifySuccess(userWS, 'Stopped algo order')
  send(userWS, ['data.ao.stopped', exID, gid])
}
