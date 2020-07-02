import _isFunction from 'lodash/isFunction'
import _noop from 'lodash/noop'
import HFS from 'bfx-hf-strategy'
import HFU from 'bfx-hf-util'
import _ from 'lodash' // eslint-disable-line

const SECTION_ARGS = { HFS, HFU, _ }

/**
 * @todo doc
 */
const withErrorHandler = (fn, params = {}) => {
  const { args, onSuccess = _noop, onFail = _noop } = params
  let res = null

  try {
    res = fn(args)

    if (_isFunction(onSuccess)) {
      onSuccess(res, params)
    }
  } catch (e) {
    if (_isFunction(onFail)) {
      onFail(e, params)
    }
  }

  return res
}

/**
 * Attempts to evaluate a strategy section assumed to hold a stringified
 * `Function`; calls the provided success/error handlers as needed and returns
 * the result, or `null` on failure.
 *
 * @todo move to general utils
 * @private
 *
 * @param {object} params - params.
 * @param {string} params.section - name of section to evaluate, key on
 *   strategy.
 * @param {Function} params.onSuccess - called with (`function`, `params`) if
 *   the `eval()` succeeds.
 * @param {Function} params.onFail - called with (`error`, `params`) if the
 *   `eval()` fails.
 * @param {string} [params.contentOverride] - if provided, this string is used
 *   instead of the value of `strategy[section]`.
 * @returns {Function|Error} res - `Error` on failure.
 */
const evalStrategyMethod = (params = {}) => {
  const {
    onFail, section, strategy, contentOverride,
  } = params

  const content = contentOverride || ((strategy || {})[section] || '')

  try {
    return /^define/u.test(section)
      ? withErrorHandler(() => eval(content), params) // eslint-disable-line
      : /^on/u.test(section) // eslint-disable-next-line
        ? withErrorHandler(() => eval(content)(SECTION_ARGS), params)
        : new Error(`Unrecognized strategy section name: ${section}`)
  } catch (e) {
    onFail(e, params)
    return null
  }
}

export {
  evalStrategyMethod,
  withErrorHandler,
}
