import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'

const transformValue = (v) => {
  if (isObject(v)) {
    return Object.keys(v).map(k => `${k}|${transformValue(v[k])}`)
  } if (isArray(v)) {
    return v.join('|')
  } if (isString(v) && v.match(/\./)) {
    return v.split('.').join('')
  }

  return v
}

export default (channel = []) => (
  channel.map(transformValue).join('~')
)
