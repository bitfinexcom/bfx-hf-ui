/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _isArray = require('lodash/isArray')
const _isObject = require('lodash/isObject')
const _isFunction = require('lodash/isFunction')

const poolInit = require('ex_pool')

describe('ex_pool: init', () => {
  it('constructs a pool object', () => {
    const pool = poolInit()

    assert(_isFunction(pool.d))
    assert(_isObject(pool.exchangeClients))
    assert(_isObject(pool.subscriptions))
    assert(_isArray(pool.dataListeners))
  })
})
