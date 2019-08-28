'use strict'

const Promise = require('bluebird')

module.exports = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
