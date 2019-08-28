'use strict'

const EXAMethods = require('./exa')
const rDEL = require ('./del')
const rGET = require ('./get')
const rLPOP = require ('./lpop')
const rLRANGE = require ('./lrange')
const rRPUSH = require ('./rpush')
const rSADD = require ('./sadd')
const rSET = require ('./set')
const rLSET = require ('./lset')
const rSETEX = require ('./setex')
const rSMEMBERS = require ('./smembers')

module.exports = {
  ...EXAMethods,

  rDEL,
  rGET,
  rLPOP,
  rLRANGE,
  rRPUSH,
  rSADD,
  rLSET,
  rSET,
  rSETEX,
  rSMEMBERS,
}
