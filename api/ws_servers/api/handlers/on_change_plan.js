'use strict'

const request = require('request-promise')

const send = require('util/ws/send')
const sendError = require('util/ws/send_error')
const validateParams = require('util/ws/validate_params')
const { notifySuccess } = require('util/ws/notify')

module.exports = async (server, ws, msg) => {
  const [, productID] = msg
  const validRequest = validateParams(ws, {
    productID: { type: 'number', v: productID }
  })

  if (!validRequest) {
    return
  } else if (!ws.user) {
    return sendError(ws, 'Unauthorized')
  }

  const res = await request('https://vendors.paddle.com/api/2.0/subscription/users/update', {
    method: 'POST',
    body: {
      vendor_id: '',
      vendor_auth_code: '',
      subscription_id: ws.user.subscriptionID,
      plan_id: productID
    }
  })

  console.log(res)

  notifySuccess(ws, 'Subscription updated')

  setTimeout(() => {
    send(ws, ['refresh'])
  }, 1000)
}
