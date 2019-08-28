'use strict'

const Promise = require('bluebird')
const redis = require('./client')

module.exports = (key, start, stop) => {
  return new Promise((resolve, reject) => {
    redis.lrange(key, start, stop, (err, res) => {
      if (err) {
        return reject(err)
      }

      resolve(res)
    })
  })
}
