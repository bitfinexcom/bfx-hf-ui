import _get from 'lodash/get'
import _map from 'lodash/map'

import types, {
  ALL_KEYS,
  DEFAULT_USER_SETTINGS_MAP,
} from '../constants/settings'

function getSettings(args = {}) {
  const {
    key = ALL_KEYS,
    prefix,
    componentSettingsParams,
  } = args

  return {
    type: types.GET_SETTINGS,
    key,
    prefix,
    componentSettingsParams,
  }
}

export const setInitialSettings = (payload) => ({
  type: types.SET_INITIAL_SETTINGS,
  payload,
})

function setMultipleSettings(...settings) {
  const payload = _map(settings, (setting) => {
    const {
      key,
      isFunding,
      value,
      persist = true,
      prefix,
      componentSettingsParams,
    } = setting

    return {
      isFunding,
      key,
      value,
      persist,
      prefix,
      componentSettingsParams,
    }
  })

  return {
    type: types.SET_SETTINGS_MULTI,
    payload,
  }
}

function setSettings(args = {}) {
  const {
    key,
    isFunding,
    value,
    persist = true,
    prefix,
    componentSettingsParams,
  } = args

  return {
    type: types.SET_SETTINGS,
    isFunding,
    key,
    value,
    persist,
    prefix,
    componentSettingsParams,
  }
}

function resetSettings(args = {}) {
  const { key } = args

  return setSettings({
    ...args,
    value: _get(DEFAULT_USER_SETTINGS_MAP, key),
  })
}

function deleteSettings(args = {}) {
  const {
    key,
    persist = true,
    prefix,
    componentSettingsParams,
  } = args

  return {
    type: types.DELETE_SETTINGS,
    key,
    persist,
    prefix,
    componentSettingsParams,
  }
}

function updateSettings(args = {}) {
  const {
    key,
    value,
    persist = true,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    componentSettingsParams,
  } = args

  return {
    type: types.UPDATE_SETTINGS,
    key,
    value,
    persist,
    min,
    max,
    componentSettingsParams,
  }
}

function toggleBooleanSetting(args = {}) {
  const {
    key,
    isFunding,
    persist = true,
    prefix,
    componentSettingsParams,
  } = args

  return {
    type: types.TOGGLE_BOOLEAN_SETTING,
    key,
    isFunding,
    persist,
    prefix,
    componentSettingsParams,
  }
}

export default {
  getSettings,
  setSettings,
  setInitialSettings,
  setMultipleSettings,
  resetSettings,
  deleteSettings,
  updateSettings,
  toggleBooleanSetting,
}
