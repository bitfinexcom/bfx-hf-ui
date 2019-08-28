'use strict'

module.exports = (poolClient, msg) => {
  const { d } = poolClient
  d('recv unknown pool message: %j', msg)
}
