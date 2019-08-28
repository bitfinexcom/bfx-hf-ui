/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _isArray = require('lodash/isArray')
const _isFinite = require('lodash/isFinite')

module.exports = (book) => {
  assert(_isArray(book))
  assert.strictEqual(book[0], 'full')
  assert(_isArray(book[1]))

  book[1].forEach((level) => {
    assert(_isFinite(level[0]))
    assert(_isFinite(level[1]))
  })
}
