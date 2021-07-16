import _isEmpty from 'lodash/isEmpty'
import _join from 'lodash/join'
import _split from 'lodash/split'
import _compact from 'lodash/compact'

const platformId = 'honey-framework'

const API_KEY_PREFIX = 'api:'
const KEY_DELIMITER = '_'

const COMPONENT_SETTING_PARAM_DELIMITER = '|'
const COMPONENT_SETTING_KEY_PREFIX = 'template_setting'

/**
 * Gets template component settings parameters string:
 * template,component,symbol -> 'template|component|symbol'
 * */
export const getComponentSettingsParamsString = (template, component, symbol) => {
  const paramsData = _compact([template, component, symbol])
  return _join(paramsData, COMPONENT_SETTING_PARAM_DELIMITER)
}

/**
 * Gets template component settings parameters data: {template, component, symbol}
 * 'template|component|symbol' -> {template, component, symbol}
 * */
export const getComponentSettingsParamsData = (componentSettingsParams) => {
  const paramsData = _split(componentSettingsParams, COMPONENT_SETTING_PARAM_DELIMITER)
  const [template, component, symbol] = paramsData
  return { template, component, symbol }
}

/**
 * Gets template component settings key prefix from parameters string:
 * 'template|component|symbol' -> 'template_setting_template_component_symbol'
 * */
export const getComponentSettingsKeyPrefix = (componentSettingsParams) => {
  const paramsData = _split(componentSettingsParams, COMPONENT_SETTING_PARAM_DELIMITER)
  const paramsKeyPrefix = _join(paramsData, KEY_DELIMITER)
  return `${COMPONENT_SETTING_KEY_PREFIX}${KEY_DELIMITER}${paramsKeyPrefix}`
}

/**
 * Gets settings key with optional template component settings prefix,
 * in case that componentSettingsParam is supplied and raw key otherwise
 */
export const getSettingsKey = (key, componentSettingsParams = '') => {
  if (_isEmpty(componentSettingsParams)) return key
  const keyPrefix = getComponentSettingsKeyPrefix(componentSettingsParams)
  return `${keyPrefix}${KEY_DELIMITER}${key}`
}

/**
 * Gets settings value, in case that componentSettingsParams is supplied,
 * returns object containing template component settings params and the value,
 * and raw value otherwise
 */
export const getSettingsValue = (value, componentSettingsParams = '') => {
  if (_isEmpty(componentSettingsParams)) return value
  return { componentSettingsParams, value }
}

/**
 * Gets settings key with default platform (api:bitfinex) or custom api prefix
 */
export const getPrefixedSettingsKey = (key, prefix = platformId, componentSettingsParams = '') => {
  const settingKey = getSettingsKey(key, componentSettingsParams)
  return `${API_KEY_PREFIX}${prefix}${KEY_DELIMITER}${settingKey}`
}

/**
 * Gets raw settings key, without platform or custom api prefix.
 */
export const getUnprefixedSettingsKey = (key) => (
  key.substr(key.indexOf(KEY_DELIMITER) + 1)
)
