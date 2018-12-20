import { select, put, takeLatest, takeEvery } from 'redux-saga/effects'
import settingsActions from 'bfxuilib/dist/redux/actions/settings.actions'
import _isNull from 'lodash/isNull'

import { getSettings } from 'bfx-ui-components/dist/var/exports'

// this saga will take care of saving UI options
// to recall it on the next page load


// Watchers
export function* onToggleSaga() {
  yield takeLatest(
    'UI_TOGGLE_COLLAPSIBLE_WIDGET',
    function* saveCollapseWorker(action = {}) {
      const { id, collapsedByDefault, persist } = action.payload

      const key = 'collapsed_widgets'
      const state = yield select()
      const currentMap = getSettings(state, key) || {}
      const currentValue = (currentMap[id] !== undefined) ? currentMap[id] : collapsedByDefault
      const nextMap = {
        ...currentMap,
        [id]: !currentValue,
      }
      yield put(settingsActions.setSettings({ key, value: nextMap, persist }))
    },
  )
}

export function* onSetOrderSaga() {
  yield takeEvery('UI_SET_ORDER', function* (action) {
    const { section, key, direction } = action.payload
    const settingKey = 'tables_sorting'
    const state = yield select()
    const currentMap = getSettings(state, settingKey)
    const [prevKey, prevAsc] = (currentMap[section] || '-').split('-')

    let newOrder = direction
    // depending on the table type direction may be set explicitly or may be not
    // if not set then need to determine it here
    if (!newOrder && !_isNull(newOrder)) {
      newOrder = (key !== prevKey)
        ? 'desc'
        : (prevAsc !== 'desc') ? 'desc' : 'asc'
      if (key === prevKey && prevAsc === 'asc') {
        newOrder = 'none'
      }
    }

    const nextValue = `${key}-${newOrder || 'NULL'}`
    yield put(settingsActions.setMapSetting({ key: settingKey, subkey: section, value: nextValue }))
  })
}
