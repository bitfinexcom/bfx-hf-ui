'use strict'

const _capitalize = require('lodash/capitalize')
const { notifyInfo } = require('util/ws/notify')

module.exports = (client, msg) => {
  const { userWS } = client
  const [,, exID] = msg

  notifyInfo(userWS, `Algo host opened for exchange ${_capitalize(exID)}`)
}
