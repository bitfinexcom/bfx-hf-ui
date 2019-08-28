'use strict'

module.exports = (key) => {
  const tokens = key.split('-')

  return {
    userID: tokens[0],
    exID: tokens[1]
  }
}
