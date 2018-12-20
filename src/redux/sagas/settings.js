import { fork, takeEvery, put, select } from 'redux-saga/effects'
import actionTypes from 'bfxuilib/dist/redux/constants/settings.constants'
import restActions from 'bfxuilib/dist/redux/actions/rest.actions'
import settingsActions from 'bfxuilib/dist/redux/actions/settings.actions'
import { initialSettingsReceived, getScheduledCallbacks } from 'bfxuilib/dist/redux/selectors/settings.selectors'
import { platformId } from 'bfxuilib/dist/functions/utils'

import { getSettings } from 'bfx-ui-components/dist/var/exports'
import { clearTradingViewLocalStorage } from 'bfx-ui-components/dist/var/utils'

const SETTINGS_SECTION = 'settings'
const SETTINGS_SUBSECTION = 'trading'

const API_KEY_PREFIX = 'api:'
const PLATFORM_DELIMITER = '_'

const prefixKey = (key, prefix = platformId) =>
  `${API_KEY_PREFIX}${prefix}${PLATFORM_DELIMITER}${key}`

function isUserLoggedIn() {
  const { isUserLoggedIn = () => false } = window
  return isUserLoggedIn()
}

const {
  GET_SETTINGS = 'GET_SETTINGS',
  SET_SETTINGS = 'SET_SETTINGS',
  DELETE_SETTINGS = 'DELETE_SETTINGS',
  RECEIVE_INITIAL_SETTINGS = 'RECEIVE_INITIAL_SETTINGS',
  SET_MAP_SETTING = 'SET_MAP_SETTING',
  TOGGLE_BOOLEAN_SETTING = 'TOGGLE_BOOLEAN_SETTING',
} = actionTypes

function* processGetSettings() {
  yield takeEvery(GET_SETTINGS, function* (action) {
    const { key, prefix } = action
    if (isUserLoggedIn()) {

      // authenticated user, request settings REST
      yield put({
        meta: {
          method: 'POST',
          url: '/v2/auth/r/settings',

          section: SETTINGS_SECTION,
          subsection: SETTINGS_SUBSECTION,
        },

        payload: {
          _bfx: 1,
          keys: [prefixKey(key, prefix)],
        },
      })

    } else {
      // demo user, just mark initial settings received
      const initialized = yield select(initialSettingsReceived)
      if (!initialized) {
        yield put(settingsActions.receiveInitialSettings())
      }
    }
  })
}

function* processSetSettings() {
  yield takeEvery(SET_SETTINGS, function* (action) {
    const {
      key,
      value,
      persist,
      prefix,
    } = action
    const state = yield select()
    const isContextSwitchReadOnly = getSettings(state, 'is_context_switch_ro')
    if (persist && isUserLoggedIn() && !isContextSwitchReadOnly) {
      yield put(restActions.send({
        path: '/v2/auth/w/settings/set',
        body: {
          _bfx: 1,
          settings: { [prefixKey(key, prefix)]: value },
        },
      }))
    }
  })
}

function* processDeleteSettings() {
  yield takeEvery(DELETE_SETTINGS, function* (action) {
    const { key, persist, prefix } = action
    const state = yield select()
    const isContextSwitchReadOnly = getSettings(state, 'is_context_switch_ro')
    if (persist && isUserLoggedIn() && !isContextSwitchReadOnly) {
      yield put(restActions.send({
        path: '/v2/auth/w/settings/del',
        body: {
          _bfx: 1,
          keys: [prefixKey(key, prefix)],
        },
      }))
    }
  })
}

function* processToggleBooleanSetting() {
  yield takeEvery(TOGGLE_BOOLEAN_SETTING, function* (action) {
    const { key, persist } = action
    const state = yield select()
    const currentValue = getSettings(state, key)
    const nextValue = !currentValue
    yield put(settingsActions.setSettings({ key, value: nextValue, persist }))
  })
}

function* processInitialSettingsReceived() {
  // got all settings, so mark initial settings received
  yield takeEvery('REST_SUCCESS', function* (action) {
    const { meta = {} } = action
    const { section, allSettings } = meta
    const initialized = yield select(initialSettingsReceived)
    if (section === SETTINGS_SECTION && allSettings && !initialized) {
      yield put(settingsActions.receiveInitialSettings())
    }
  })
}

function* processScheduledCallbacks() {
  // initial settings received, now need to call all the scheduled callbacks
  yield takeEvery(RECEIVE_INITIAL_SETTINGS, function* () {
    const state = yield select()
    const scheduledCallbacks = getScheduledCallbacks(state)
    for (const callback of scheduledCallbacks) {
      try {
        callback()
      } catch (e) {
        // don't stop iterating on exception inside some individual callback
        console.error(e)
      }
    }
  })
}

function* processSetMapSetting() {
  yield takeEvery(SET_MAP_SETTING, function* (action) {
    const {
      key, subkey, value, persist,
    } = action
    const state = yield select()
    const currentMap = getSettings(state, key)
    const nextMap = {
      ...currentMap,
      [subkey]: value,
    }
    yield put(settingsActions.setSettings({ key, value: nextMap, persist }))
  })
}

function* clearLocalStorageOnTradingViewSettingsReset() {
  yield takeEvery(SET_SETTINGS, function* (action) {
    const { key, value } = action
    if (key === 'chart_settings' && value === null) {
      clearTradingViewLocalStorage()
    }
    yield 0
  })
}

function* settingsSaga() {
  yield fork(processGetSettings)
  yield fork(processSetSettings)
  yield fork(processDeleteSettings)
  yield fork(processToggleBooleanSetting)
  yield fork(processInitialSettingsReceived)
  yield fork(processScheduledCallbacks)
  yield fork(processSetMapSetting)
  yield fork(clearLocalStorageOnTradingViewSettingsReset)
}

export default settingsSaga
