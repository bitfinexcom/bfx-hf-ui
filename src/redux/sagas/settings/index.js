/* eslint-disable import/no-named-as-default-member */
/* eslint-disable func-names */
import {
  fork, takeEvery, put, select, call,
} from 'redux-saga/effects'
import _isEmpty from 'lodash/isEmpty'
import _isArray from 'lodash/isArray'
import _endsWith from 'lodash/endsWith'
import _forEach from 'lodash/forEach'
import _set from 'lodash/set'
import { v4 } from 'uuid'

import actionTypes from '../../constants/settings'
import settingsActions from '../../actions/settings'
import { getSettingsWithDefault as getSettings } from '../../selectors/settings'
import { getAuthToken, getAuthConfigured } from '../../selectors/ws'

import { recvNotification } from '../../actions/ui'
import { getPrefixedSettingsKey, getSettingsValue } from '../../../util/settings'
import api from './api'

const {
  GET_SETTINGS,
  SET_SETTINGS,
  SET_SETTINGS_MULTI,
  DELETE_SETTINGS,
  TOGGLE_BOOLEAN_SETTING,
} = actionTypes

export function* fetchSettings(action) {
  const {
    key,
    prefix,
    componentSettingsParams,
  } = action

  try {
    const settingKey = getPrefixedSettingsKey(key, prefix, componentSettingsParams)
    const { data = [], status } = yield call(api.getSettings, [settingKey])
    if (status === 200 && _isArray(data)) {
      yield put(settingsActions.setInitialSettings(data))
    }
  } catch (e) {
    console.error(e)
  }
}

function* processGetSettings() {
  yield takeEvery(GET_SETTINGS, fetchSettings)
}

function setSettings(settings, setting) {
  const {
    key,
    value,
    persist,
    prefix,
    componentSettingsParams,
  } = setting

  if (!persist) {
    return
  }
  const settingKey = getPrefixedSettingsKey(key, prefix, componentSettingsParams)
  const settingValue = getSettingsValue(value, componentSettingsParams)
  _set(settings, settingKey, settingValue)
}

function* processSetSettings() {
  yield takeEvery([SET_SETTINGS, SET_SETTINGS_MULTI], function* (action) {
    const settings = {}
    if (action.type === SET_SETTINGS_MULTI) {
      _forEach(action.payload, (setting) => setSettings(settings, setting))
    } else {
      setSettings(settings, action)
    }

    const isAuthenticated = yield select(getAuthConfigured)
    const token = yield select(getAuthToken)
    const isReadOnlyToken = _endsWith(token, '-read')

    if (!_isEmpty(settings)
      && isAuthenticated
      && !isReadOnlyToken) {
      try {
        const { status } = yield call(api.setSettings, settings)
        if (status === 200 && action.type === SET_SETTINGS_MULTI) {
          yield put(recvNotification({
            mts: Date.now(),
            status: 'success',
            text: 'Setting saved',
            cid: v4(),
          }))
        }
      } catch (e) {
        console.error(e)
      }
    }
  })
}

function* processDeleteSettings() {
  yield takeEvery(DELETE_SETTINGS, function* (action) {
    const {
      key,
      persist,
      prefix,
      componentSettingsParams,
    } = action

    const isAuthenticated = yield select(getAuthConfigured)

    if (persist && isAuthenticated) {
      try {
        const settingKey = getPrefixedSettingsKey(key, prefix, componentSettingsParams)
        yield call(api.delSettings, [settingKey])
      } catch (e) {
        console.error(e)
      }
    }
  })
}

function* processToggleBooleanSetting() {
  yield takeEvery(TOGGLE_BOOLEAN_SETTING, function* (action) {
    const {
      key,
      isFunding,
      persist,
      prefix,
      componentSettingsParams,
    } = action

    const currentValue = yield select(getSettings, key, componentSettingsParams)

    const nextValue = !currentValue

    const setSettingsAction = settingsActions.setSettings({
      key,
      isFunding,
      value: nextValue,
      persist,
      prefix,
      componentSettingsParams,
    })
    yield put(setSettingsAction)
  })
}

function* settingsSaga() {
  yield fork(processGetSettings)
  yield fork(processSetSettings)
  yield fork(processDeleteSettings)
  yield fork(processToggleBooleanSetting)
}

export default settingsSaga
