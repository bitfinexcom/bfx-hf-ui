'use strict'

const Promise = require('bluebird')
const redis = require('./client')

module.exports = (key, sec, value) => {
  return new Promise((resolve, reject) => {
    redis.setex(key, sec, JSON.stringify(value), (err, res) => {
      if (err) {
        return reject(new Error(err))
      }

      resolve(res)
    })
  })
}
