'use strict'

module.exports = (client, msg) => {
  const { d } = client
  d('recv unknown pool message: %j', msg)
}
