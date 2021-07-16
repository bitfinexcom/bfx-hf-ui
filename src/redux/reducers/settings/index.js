import _isArray from 'lodash/isArray'
import _get from 'lodash/get'
import _omit from 'lodash/omit'
import _mapValues from 'lodash/mapValues'
import _keyBy from 'lodash/keyBy'
import _map from 'lodash/map'

import adapter from '../../adapters/settings'
import actionTypes from '../../constants/settings'
import { getSettingsKey, getSettingsValue } from '../../../util/settings'

export function getInitialState() {
  return {
    initialSettingsReceived: false,
    settings: {
      cookiesPermission: (
        window.localStorage
        && window.localStorage.getItem('cookiesPermission')
      ),
    },
    settingsPersisted: {},
  }
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case actionTypes.SET_INITIAL_SETTINGS: {
      if (!_isArray(payload)) {
        return state
      }
      const settingsData = _keyBy(
        _map(payload, adapter),
        ({ key }) => key,
      )
      const settings = _mapValues(
        settingsData,
        ({ value }) => value,
      )
      const settingsPersisted = _mapValues(
        settingsData,
        () => true,
      )

      return {
        ...state,
        initialSettingsReceived: true,
        settings: {
          __authSettingReceived: true,
          ...state.settings,
          ...settings,
        },
        settingsPersisted: {
          ...state.settingsPersisted,
          ...settingsPersisted,
        },
      }
    }

    case actionTypes.SET_SETTINGS_MULTI: {
      const settingsData = _keyBy(
        action.payload,
        ({ key, componentSettingsParams }) => (
          getSettingsKey(key, componentSettingsParams)
        ),
      )
      const settings = _mapValues(
        settingsData,
        ({ value, componentSettingsParams }) => (
          getSettingsValue(value, componentSettingsParams)
        ),
      )
      const settingsPersisted = _mapValues(
        settingsData,
        ({ persist }) => persist,
      )

      return {
        ...state,
        settings: {
          ...state.settings,
          ...settings,
        },
        settingsPersisted: {
          ...state.settingsPersisted,
          ...settingsPersisted,
        },
      }
    }

    case actionTypes.SET_SETTINGS: {
      const {
        key, value, persist, componentSettingsParams,
      } = action
      const settingKey = getSettingsKey(key, componentSettingsParams)
      const settingValue = getSettingsValue(value, componentSettingsParams)

      return {
        ...state,
        settings: {
          ...state.settings,
          [settingKey]: settingValue,
        },
        settingsPersisted: {
          ...state.settingsPersisted,
          [settingKey]: persist,
        },
      }
    }

    case actionTypes.DELETE_SETTINGS: {
      const { key, componentSettingsParams } = action
      const settingKey = getSettingsKey(key, componentSettingsParams)

      return {
        ...state,
        settings: _omit(state.settings, settingKey),
        settingsPersisted: _omit(state.settingsPersisted, settingKey),
      }
    }

    case actionTypes.UPDATE_SETTINGS: {
      const {
        key,
        value,
        persist,
        min = Number.MIN_SAFE_INTEGER,
        max = Number.MAX_SAFE_INTEGER,
        componentSettingsParams,
      } = action

      const settingKey = getSettingsKey(key, componentSettingsParams)
      const settingValuePath = componentSettingsParams ? ['value'] : []
      const settingFullPath = ['settings', settingKey, ...settingValuePath]
      const prevValue = _get(state, settingFullPath, 0)

      const newValue = prevValue + value
      if (newValue > max || newValue < min) {
        return state
      }
      const settingValue = getSettingsValue(newValue, componentSettingsParams)

      return {
        ...state,
        settings: {
          ...state.settings,
          [settingKey]: settingValue,
        },
        settingsPersisted: {
          ...state.settingsPersisted,
          [settingKey]: persist,
        },
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
