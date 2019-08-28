'use strict'

const _isFunction = require('lodash/isFunction')

module.exports = (aoHost, aoID, payload) => {
  const ao = aoHost.getAO(aoID)

  if (!ao) {
    return `Unknown algo order ID: ${aoID}`
  }

  const { meta = {} } = ao
  const { validateParams, processParams } = meta

  const params = _isFunction(processParams)
    ? processParams(payload)
    : { ...payload }

  if (_isFunction(validateParams)) {
    const err = validateParams(params)

    if (err) {
      return err
    }
  }

  return null
}
