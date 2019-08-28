'use strict'

const Promise = require('bluebird')
const redis = require('./client')
const parse = require('./parse')

module.exports = (key) => {
  return new Promise((resolve, reject) => {
    redis.lpop(key, (err, res) => {
      if (err) {
        return reject(err)
      }

      resolve(res)
    })
  })
}
