'use strict'

const Promise = require('bluebird')
const redis = require('./client')

module.exports = (key, value) => {
  return new Promise((resolve, reject) => {
    redis.set(key, JSON.stringify(value), (err, res) => {
      if (err) {
        return reject(new Error(err))
      }

      resolve(res)
    })
  })
}
