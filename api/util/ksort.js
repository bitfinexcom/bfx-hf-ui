'use strict'

module.exports = (obj) => {
  const keys = Object.keys(obj).sort()
  const sortedObj = {}

  for (var i in keys) {
    sortedObj[keys[i]] = obj[keys[i]]
  }

  return sortedObj
}
