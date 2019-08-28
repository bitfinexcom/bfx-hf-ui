'use strict'

const Promise = require('bluebird')
const scrypt = require('scrypt-js')
const buffer = require('scrypt-js/thirdparty/buffer')

module.exports = (password, salt) => {
  const pwBuff = new buffer.SlowBuffer(password.normalize('NFKC'))
  const saltBuff = new buffer.SlowBuffer(salt.normalize('NFKC'))

  return new Promise((resolve, reject) => {
    scrypt(pwBuff, saltBuff, 1024, 8, 1, 32, (error, progress, key) => {
      if (error) {
        return reject(new Error(error))
      }

      if (!key) {
        return
      }

      resolve(key)
    })
  })
}
