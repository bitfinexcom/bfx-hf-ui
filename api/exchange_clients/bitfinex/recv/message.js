'use strict'

const _isObject = require('lodash/isObject')
const _isArray = require('lodash/isArray')
const recvData = require('./data')
const recvEvent = require('./event')

module.exports = (exa, msg) => {
  if (_isObject(msg) && msg.event) {
    recvEvent(exa, msg)
  } else if (_isArray(msg)) {
    recvData(exa, msg)
  }
}
