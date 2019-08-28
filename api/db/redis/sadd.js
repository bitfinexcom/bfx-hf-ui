'use strict'

const Promise = require('bluebird')
const redis = require('./client')
const parse = require('./parse')

module.exports = (key, ...members) => {
  return new Promise((resolve, reject) => {
    redis.sadd(key, ...members, (err, res) => {
      const [parseErr, data] = parse(err, res)

      if (parseErr) {
        return reject(parseErr)
      }

      resolve(data)
    })
  })
}
