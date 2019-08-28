'use strict'

const send = require('util/ws/send')
const sendError = require('util/ws/send_error')
const { notifySuccess } = require('util/ws/notify')

module.exports = (ws, passAuthToken) => {
  const { user } = ws

  if (!user) {
    return sendError(ws, 'Not authenticated')
  }

  const apiKeys = {
    bitfinex: {
      key: user.bitfinexAPIKey,
      secret: user.bitfinexAPISecret
    },

    binance: {
      key: user.binanceAPIKey,
      secret: user.binanceAPISecret
    }
  }

  send(ws, [
    'authenticated',
    user.id,
    user.username,
    user.email,
    passAuthToken ? user.authToken : null,
    apiKeys,
    user.subscription,
    user.cancelSubscriptionURL,
    user.updateBillingURL
  ])

  notifySuccess(ws, 'Authenticated')
}
