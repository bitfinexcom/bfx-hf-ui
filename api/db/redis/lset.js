'use strict'

const Promise = require('bluebird')
const redis = require('./client')

module.exports = (key, index, value) => {
  return new Promise((resolve, reject) => {
    redis.lset(key, index, value, (err, res) => {
      if (err) {
        return reject(new Error(err))
      }

      resolve(res)
    })
  })
}
