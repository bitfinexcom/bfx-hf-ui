'use strict'

const _capitalize = require('lodash/capitalize')
const { notifySuccess } = require('util/ws/notify')
const send = require('util/ws/send')

module.exports = (client, msg) => {
  const { userWS } = client
  const [,, exID, name, label, gid, args] = msg

  notifySuccess(userWS, `Started AO ${name} on ${_capitalize(exID)}`)
  send(userWS, ['data.ao', exID, { gid, name, label, args }])
}
