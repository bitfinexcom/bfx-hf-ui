'use strict'

const _uniq = require('lodash/uniq')
const _flatten = require('lodash/flatten')
const { RESTv2 } = require('bfx-api-node-rest')
const symbolTransformer = require('./transformers/symbol')
const rest = new RESTv2()

module.exports = () => {
  return rest.conf([
    'pub:list:pair:exchange',
    'pub:list:pair:margin'
  ]).then(res => {
    const symbols = _uniq(_flatten(res[0], res[1]))
    return symbols.map((sym) => symbolTransformer(res, sym))
  })
}
