'use strict'

const Promise = require('bluebird')
const redis = require('./client')
const parse = require('./parse')

module.exports = (key) => {
  return new Promise((resolve, reject) => {
    redis.del(key, (err, res) => {
      const [parseErr, data] = parse(err, res)

      if (parseErr) {
        return reject(parseErr)
      }

      resolve(data)
    })
  })
}
