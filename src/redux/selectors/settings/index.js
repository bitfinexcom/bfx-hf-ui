import { createSelector } from 'reselect'
import _get from 'lodash/get'
import _pickBy from 'lodash/pickBy'
import _includes from 'lodash/includes'
import _isString from 'lodash/isString'
import _toUpper from 'lodash/toUpper'
import _toLower from 'lodash/toLower'
import _isUndefined from 'lodash/isUndefined'
import _split from 'lodash/split'
import _startsWith from 'lodash/startsWith'

import { removePrefix } from '../../functions/format'
import { getSettingsKey } from '../../utils/settings'
import { DEFAULT_USER_SETTINGS_MAP, DEFAULT_THEME } from '../../var/ui'
import { getCurrentSymbol } from './symbols.selectors'
import { getUISoundNotice } from './UI.selectors'
import { getIsDerivativePair } from './currencies.selectors'
import { SETTINGS_KEYS as TICKER_SETTINGS } from '../constants/ticker.constants'
import { SETTINGS_KEYS as BOOK_SETTINGS } from '../constants/book.constants'
import { SETTINGS_KEYS as DEPTHCHART_SETTINGS } from '../constants/depthChart.constants'
import { GRID_ENABLED_FOR_TRADING_PAGE_KEY } from '../constants/layouts.constants'
import { isTradingSpa } from '../../functions/config.selectors'
import {
  fromOldTheme,
  fromThemeString,
  getThemeFromCache,
  normalizeMode,
  toThemeString,
} from '../../functions/themes'

const EMPTY_OBJ = {}

export const getReducer = (state) => _get(state, 'settings', {})
const getSettingsReducer = (state) => _get(getReducer(state), 'settings', {})

export const initialSettingsReceived = (state) => getReducer(state).initialSettingsReceived
// eslint-disable-next-line max-len
export const initialSettingsAuthReceived = (state) => getSettingsReducer(state).__authSettingReceived
export const getConfCtx = (state) => getReducer(state).confCtx

export const getSettings = (state, key, defaultValue = null, componentSettingsParams = '') => {
  const settings = getSettingsReducer(state)
  const settingKey = getSettingsKey(key, componentSettingsParams)
  const settingPath = componentSettingsParams ? [settingKey, 'value'] : settingKey
  const setting = _get(settings, settingPath)
  return _isUndefined(setting) ? defaultValue : setting
}

export const getSettingsDefaultValue = (key) => (
  _get(DEFAULT_USER_SETTINGS_MAP, key)
)

export const getSettingsWithDefault = (state, key, componentSettingsParams = '') => {
  const defaultValue = getSettingsDefaultValue(key)
  return getSettings(state, key, defaultValue, componentSettingsParams)
}

export const getSettingsPersisted = (state) => (
  _get(state, ['settings', 'settingsPersisted'])
)

export const getThemeFromSetting = (state) => getSettings(state, 'theme_with_mode') || getSettings(state, 'theme')

export const getBrowserThemeMode = (state) => getSettings(state, 'browser_theme_mode')

export const getThemeByPlatform = createSelector(
  [
    (state) => getSettings(state, 'theme_with_mode'),
    (state) => getSettings(state, 'theme'),
  ],
  /* eslint-disable camelcase */
  (theme_with_mode, theme) => theme_with_mode || fromOldTheme(theme)
    || getThemeFromCache()
    || DEFAULT_THEME,
)

export const getThemeWithMode = createSelector(
  [getThemeByPlatform, getBrowserThemeMode],
  (stateThemeAndMode, browserThemeMode) => {
    // get theme with mode stored
    const { name: stateThemeName, mode: stateThemeMode } = fromThemeString(stateThemeAndMode)
    // normalize mode if auto mode is stored
    const mode = normalizeMode(stateThemeMode, browserThemeMode)

    // return theme name with normalized mode
    return toThemeString({ name: stateThemeName, mode })
  },
)

export const getGridEnabledForTradingSetting = (state) => (
  getSettings(state, GRID_ENABLED_FOR_TRADING_PAGE_KEY, false)
)

export const getSidebarByPlatform = (state) => getSettings(state, 'sidebar_side', 'left')

export const isNotifyEnabled = (state, group) => getSettings(state, `notify_${group}_enabled`, true)

export const getCollapsedWidgets = (state) => getSettings(state, 'collapsed_widgets') || {}
export const getCollapsedWidget = createSelector(
  [(_, name) => name, getCollapsedWidgets, getGridEnabledForTradingSetting],
  (name, collapsedWidgets, isGridEnabled) => (
    (isGridEnabled && isTradingSpa)
      ? false
      : collapsedWidgets[name]
  ),
)
export const getWidgetsCollapsed = (state) => getCollapsedWidgets(state).ord

export const getNotificationSidebarSetting = (state) => getSettings(state, 'notifications_sidebar_visible')
export const getTableSorting = (state, name) => {
  const tablesSorting = getSettings(state, 'tables_sorting') || {}
  const savedOrder = tablesSorting[name] || ''
  if (!_isString(savedOrder) || !_includes(savedOrder, '-')) {
    return EMPTY_OBJ
  }

  const [savedSortBy, savedSortDirection] = _split(savedOrder, '-')
  const lowerSavedSortDirection = _toLower(savedSortDirection)
  return {
    sortBy: savedSortBy,
    sortDirection: lowerSavedSortDirection === 'asc' || lowerSavedSortDirection === 'desc'
      ? savedSortDirection
      : null,
  }
}

export const makeIsFavoriteSymbol = () => createSelector(
  [
    (state) => getSettings(state, TICKER_SETTINGS.FAVORITE_SYMBOLS),
    (_, props) => props.symbol,
  ],
  (favoriteSymbols, symbol) => _includes(favoriteSymbols, removePrefix(symbol)),
)

export const makeSettingsWithPrefix = (prefix) => createSelector(
  [getSettingsReducer],
  (settings) => _pickBy(settings, (_, key) => _startsWith(key, prefix)),
)

export const getTickerBookPrecision = (state, symbol, componentSettingsParams = '') => {
  const bookPrec = getSettings(
    state,
    BOOK_SETTINGS.TICKER_BOOK_PRECISION,
    {},
    componentSettingsParams,
  )
  const bookSymbol = symbol || getCurrentSymbol(state)

  const prec = _get(bookPrec, bookSymbol)
  // use precision setting for ticker or fall back to global setting
  return prec >= 0 ? prec : getSettings(state, BOOK_SETTINGS.BOOK_PRECISION, 0)
}

export const getDepthChartBookPrecision = (state, symbol, componentSettingsParams = '') => {
  const depthPrec = getSettings(
    state,
    DEPTHCHART_SETTINGS.DEPTHCHART_BOOK_PRECISION,
    {},
    componentSettingsParams,
  )
  const depthSymbol = symbol || getCurrentSymbol(state)

  const prec = _get(depthPrec, depthSymbol)
  // use precision setting for depthchart or fall back to global setting
  return prec >= 0 ? prec : getSettings(state, DEPTHCHART_SETTINGS.BOOK_PRECISION, 0)
}

// all the filters are moved to order_filters
// this selector wrap the old settings if the order_filters is not presented
export const getOrderFilterSettings = createSelector(
  [
    (state) => getSettings(state, 'order_filters'),
    (state) => _toUpper(getSettingsWithDefault(state, 'order_history_filter')),
    (state) => getSettingsWithDefault(state, 'filter_by_symbol'),
  ],
  (orderFilters, statusFilter, symbolFilter) => {
    if (orderFilters) {
      return orderFilters
    }

    return {
      pair: symbolFilter ? 'CURRENT_PAIR' : null,
      hist_status: statusFilter === 'ALL' ? null : statusFilter,
    }
  },
)

export const getSoundNoticeSettings = (state) => getSettings(state, 'sound_notices')
export const getpulseTermAccept = (state) => getSettings(state, 'pulse_intro_accept')
const getPulseSidebarToggleTypeSetting = (state) => getSettings(state, 'pulse_sidebar_toggle_layout')
export const getPulseSidebarToggleType = createSelector(
  [getPulseSidebarToggleTypeSetting, getGridEnabledForTradingSetting],
  (type, isCustomGridEnabled) => (isCustomGridEnabled ? undefined : type),
)

export const getPulseSidebarOpen = (state) => getSettings(state, 'pulseSidebar')
// support fallback to legacy UI notice sound
export const getSoundNoticeSetting = createSelector(
  [
    getSoundNoticeSettings,
    getUISoundNotice,
    (_, key) => key,
  ],
  (soundNoticeSettings, uiSound, key) => _get(soundNoticeSettings, key) || uiSound,
)

const marginOrDerivative = (symbol, isDerivativePair) => (
  isDerivativePair && isDerivativePair(symbol)
    ? 'derivatives'
    : 'margin'
)

const getLeverageSetting = (confCtx, isDerivativePair, symbol) => {
  const type = marginOrDerivative(symbol, isDerivativePair)
  const pair = removePrefix(symbol)
  const base = _get(confCtx, [type, 'initial', 'base'])
  return 1 / _get(confCtx, [type, 'initial', pair], base)
}

/* TODO: getLeverage now not used in bfxft, clean it after replaceing with getLeverageBySymbol in other dependent repos
*/
export const getLeverage = createSelector(
  [
    getConfCtx,
    getIsDerivativePair,
    (_, symbol) => symbol,
  ],
  getLeverageSetting,
)

export const getLeverageBySymbol = createSelector(
  [
    getConfCtx,
    getIsDerivativePair,
  ],
  (confCtx, isDerivativePair) => (symbol) => getLeverageSetting(confCtx, isDerivativePair, symbol),
)

export default {
  initialSettingsReceived,
  getSettings,
  getSettingsPersisted,
  getThemeByPlatform,
  getBrowserThemeMode,
  isNotifyEnabled,
  getCollapsedWidgets,
  getCollapsedWidget,
  getWidgetsCollapsed,
  getTableSorting,
  makeIsFavoriteSymbol,
  makeSettingsWithPrefix,
  getConfCtx,
  getTickerBookPrecision,
  getOrderFilterSettings,
  getSoundNoticeSettings,
  getSoundNoticeSetting,
  getNotificationSidebarSetting,
  getLeverage,
  getLeverageBySymbol,
}
