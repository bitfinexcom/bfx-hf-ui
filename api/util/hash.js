'use strict'

const sha = require('sha.js')

module.exports = (...parts) => {
  let h = sha('sha256')

  for (let i = 0; i < parts.length; i += 1) {
    h = h.update(`${parts[i]}`)
  }

  return h.digest('hex')
}
