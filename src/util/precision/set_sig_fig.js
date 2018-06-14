import Big from 'bignumber.js'
import _isFinite from 'lodash/isFinite'

/**
 * Smartly set the precision (decimal) on a value based off of the significant
 * digit maximum. For example, calling with 3.34 when the max sig figs allowed
 * is 5 would return '3.3400', the representation number of decimals IF they
 * weren't zeros.
 *
 * @param {number} n
 * @param {number} maxSigs - default 5
 * @return {string} str
 */
export default (number = 0, maxSigs = 5) => {
  const n = +(number)

  if (!_isFinite(n)) {
    return number
  }

  const value = n.toPrecision(maxSigs)

  return /e/.test(value)
    ? new Big(value).toString()
    : value
}
