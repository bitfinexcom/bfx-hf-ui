'use strict'

module.exports = (cdKey) => {
  const chanData = {}
  const pairs = cdKey.split('|')
  let tokens

  for (let i = 0; i < pairs.length; i += 1) {
    tokens = pairs[i].split('-')
    chanData[tokens[0]] = tokens[1]
  }

  return chanData
}
