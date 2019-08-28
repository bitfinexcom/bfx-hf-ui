'use strict'

module.exports = (client, msg) => {
  const { d } = client
  const [, userID] = msg

  d('identified for user %s', userID)
}
