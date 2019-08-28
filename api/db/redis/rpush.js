'use strict'

const Promise = require('bluebird')
const redis = require('./client')
const parse = require('./parse')

module.exports = (key, ...members) => {
  return new Promise((resolve, reject) => {
    redis.rpush(key, ...members, (err, res) => {
      if (err) {
        return reject(err)
      }

      resolve(res)
    })
  })
}
