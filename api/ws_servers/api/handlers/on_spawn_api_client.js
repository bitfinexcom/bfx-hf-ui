'use strict'

const AES = require('aes-js')
const _capitalize = require('lodash/capitalize')
const _isEmpty = require('lodash/isEmpty')

const sentry = require('sentry')
const genAESKey = require('util/gen_aes_key')
const sendError = require('util/ws/send_error')
const {
  notifyInternalError, notifyError, notifySuccess
} = require('util/ws/notify')

const openAuthBitfinexConnection = require('../open_auth_bitfinex_connection')
const openAuthBinanceConnection = require('../open_auth_binance_connection')

module.exports = async (server, ws, msg) => {
  const { d } = server
  const [, exID, password] = msg

  if (!ws.user) {
    return sendError(ws, 'Unauthorized')
  } else if (ws.clients[exID]) {
    return sendError(ws, `Client for ${_capitalize(exID)} already exists`)
  } else if (exID !== 'bitfinex' && exID !== 'binance') {
    return sendError(ws, 'Unrecognised exchange, cannot save API credentials')
  }

  const cryptedAPIKey = ws.user[`${exID}APIKey`]
  const cryptedAPISecret = ws.user[`${exID}APISecret`]
  const cryptedControl = ws.user[`${exID}APIControl`]

  if (_isEmpty(cryptedAPIKey) || _isEmpty(cryptedAPISecret)) {
    return sendError(ws, `API credentials not configured for ${_capitalize(exID)}`)
  }

  let key

  try {
    key = await genAESKey(password, `${ws.user.id}`)
  } catch (e) {
    sentry.captureException(e)
    d('error creating encryption key: %s', e.message)
    return notifyInternalError(ws)
  }

  const aesCTR = new AES.ModeOfOperation.ctr(key) // eslint-disable-line
  const apiKey = AES.utils.utf8.fromBytes(aesCTR.decrypt(
    AES.utils.hex.toBytes(cryptedAPIKey)
  ))

  const apiSecret = AES.utils.utf8.fromBytes(aesCTR.decrypt(
    AES.utils.hex.toBytes(cryptedAPISecret)
  ))

  const apiControl = AES.utils.utf8.fromBytes(aesCTR.decrypt(
    AES.utils.hex.toBytes(cryptedControl)
  ))

  if (apiControl !== 'control') {
    return notifyError(ws, 'Wrong password for API credentials')
  }

  notifySuccess(ws, `Successfully decrypted API credentials for ${_capitalize(exID)}`)

  switch (exID) {
    case 'bitfinex': {
      ws.aoc.openHost('bitfinex', apiKey, apiSecret)
      ws.clients.bitfinex = openAuthBitfinexConnection(ws, apiKey, apiSecret)
      break
    }

    case 'binance': {
      ws.aoc.openHost('binance', apiKey, apiSecret)
      ws.clients.binance = openAuthBinanceConnection(ws, apiKey, apiSecret)
      break
    }

    default: {
      sentry.captureException(new Error(`unknown exID: ${exID}`))
      d('unknown exID broke through: %s', exID)
    }
  }
}
