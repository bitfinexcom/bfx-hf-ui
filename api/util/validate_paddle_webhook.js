'use strict'

const crypto = require('crypto')
const Serialize = require('php-serialize')
const _isArray = require('lodash/isArray')

const ksort = require('util/ksort')

// Taken from Paddle docs: https://paddle.com/docs/reference-verifying-webhooks
module.exports = (paddleKey, reqBody) => {
  const sig = Buffer.from(reqBody.p_signature, 'base64')

  delete reqBody.p_signature

  // Need to serialize array and assign to data object
  const sortedReqBody = ksort(reqBody)

  for (var property in sortedReqBody) {
    if (
      sortedReqBody.hasOwnProperty(property) &&
      (typeof sortedReqBody[property]) !== 'string'
    ) {
      if (_isArray(sortedReqBody[property])) {
        sortedReqBody[property] = sortedReqBody[property].toString()
      } else { // if its not an array and not a string, then it is a JSON obj
        sortedReqBody[property] = JSON.stringify(sortedReqBody[property])
      }
    }
  }

  const serialized = Serialize.serialize(sortedReqBody)
  const verifier = crypto.createVerify('sha1')

  verifier.update(serialized)
  verifier.end()

  return verifier.verify(paddleKey, sig)
}
