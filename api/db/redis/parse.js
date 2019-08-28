'use strict'

const capture = require('capture')

module.exports = (err, res) => {
  if (err) {
    return [new Error(err), null]
  }

  try {
    return [null, JSON.parse(res)]
  } catch (e) {
    capture.exception(e)
    return [new Error('failed to parse redis JSON'), null]
  }
}
