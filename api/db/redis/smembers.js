'use strict'

const Promise = require('bluebird')
const redis = require('./client')

module.exports = (key) => {
  return new Promise((resolve, reject) => {
    redis.smembers(key, (err, res) => {
      if (err) {
        return reject(err)
      }

      resolve(res)
    })
  })
}
