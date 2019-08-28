'use strict'

module.exports = (o = []) => ([
  o[0], // id
  o[1], // gid
  o[2], // cid
  o[3], // symbol
  o[4], // created
  o[6], // amount
  o[7], // original amount
  o[8], // type
  o[13], // status
  o[16] // price
])
