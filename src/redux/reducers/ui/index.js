import Debug from 'debug'
import _get from 'lodash/get'
import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'
import _cloneDeep from 'lodash/cloneDeep'
import _min from 'lodash/min'
import _max from 'lodash/max'
import _reduce from 'lodash/reduce'
import _entries from 'lodash/entries'
import _values from 'lodash/values'
import _some from 'lodash/some'
import _isUndefined from 'lodash/isUndefined'
import { nonce } from 'bfx-api-node-util'
import { VOLUME_UNIT, VOLUME_UNIT_PAPER } from '@ufx-ui/bfx-containers'

import types from '../../constants/ui'
import * as Routes from '../../../constants/routes'
import { DEFAULT_TRADING_LAYOUT, DEFAULT_MARKET_DATA_LAYOUT } from '../../../constants/layouts'
import DEFAULT_TRADING_COMPONENT_STATE from './default_component_state_trading'
import DEFAULT_MARKET_DATA_COMPONENT_STATE from './default_component_state_market_data'
import DEFAULT_ACTIVE_MARKET_STATE from './default_active_market_state'

import {
  COMPONENT_DIMENSIONS,
  DEFAULT_TRADING_KEY,
  DEFAULT_MARKET_KEY,
  layoutDefToGridLayout,
  gridLayoutToLayoutDef,
} from '../../../components/GridLayout/GridLayout.helpers'

const debug = Debug('hfui:rx:r:ui')
const LAYOUTS_KEY = 'HF_UI_LAYOUTS'
const LAYOUTS_STATE_KEY = 'HF_UI_LAYOUTS_STATE'
const ACTIVE_MARKET_KEY = 'HF_UI_ACTIVE_MARKET'
const ACTIVE_MARKET_PAPER_KEY = 'HF_UI_PAPER_ACTIVE_MARKET'
const IS_PAPER_TRADING = 'IS_PAPER_TRADING'
export const PAPER_MODE = 'paper'
export const MAIN_MODE = 'main'
const shownOldFormatModal = false

const DEFAULT_MARKET = {
  contexts: ['e', 'm'],
  restID: 'tBTCUSD',
  wsID: 'tBTCUSD',
  base: 'BTC',
  quote: 'USD',
  uiID: 'BTC/USD',
}

const getActiveLayoutDef = state => (!_isEmpty(state.unsavedLayout)
  ? state.unsavedLayout
  : _get(state, `layouts.${state.layoutID}`, {}))

function getInitialState() {
  const defaultState = {
    activeMarket: DEFAULT_MARKET,
    notificationsVisible: false,
    previousMarket: null,
    remoteVersion: null,
    firstLogin: false,
    isPaperTrading: false,
    TRADING_PAGE_IS_GUIDE_ACTIVE: true,
    isTradingModeModalVisible: false,
    isRefillBalanceModalVisible: false,
    isOldFormatModalVisible: false,
    isBadInternetConnection: false,
    isOrderExecuting: false,
    content: {},
    unsavedLayout: null,
    layoutID: null,
    layouts: {},
    isWsLayoutsSet: false,
  }

  if (!localStorage) {
    return defaultState
  }

  const isPaperTrading = localStorage.getItem(IS_PAPER_TRADING) === 'true'
  // const layoutsJSON = localStorage.getItem(LAYOUTS_KEY)
  const layoutsComponentStateJSON = localStorage.getItem(LAYOUTS_STATE_KEY)

  // try {
  //   const storedLayouts = JSON.parse(layoutsJSON)

  //   const isNewFormat = !_some(
  //     _values(storedLayouts),
  //     layout => _isUndefined(layout.savedAt),
  //   )

  //   // transform old format to new format for compatibility
  //   const nextFormatLayouts = isNewFormat ? storedLayouts : _reduce(
  //     _entries(storedLayouts),
  //     (nextLayouts, [key, layout]) => {
  //       const routePath = layout.type === 'data'
  //         ? Routes.marketData.path
  //         : Routes.tradingTerminal.path

  //       return {
  //         ...nextLayouts,
  //         // Previously stored default layout could have been edited
  //         // so store them without newly added ' Layout' suffix key
  //         // and set isDefault false and canDelete true
  //         [key]: {
  //           ...layout,
  //           routePath,
  //           isDefault: false,
  //           canDelete: true,
  //           savedAt: Date.now(),
  //         },
  //       }
  //     },
  //     {
  //       [DEFAULT_TRADING_KEY]: DEFAULT_TRADING_LAYOUT,
  //       [DEFAULT_MARKET_KEY]: DEFAULT_MARKET_DATA_LAYOUT,
  //     },
  //   )

  //   // saving reformatted layouts into the local storage
  //   if ((!isNewFormat && !_isEmpty(storedLayouts)) || shownOldFormatModal) {
  //     shownOldFormatModal = true
  //     defaultState.isOldFormatModalVisible = true
  //     localStorage.setItem(LAYOUTS_KEY, JSON.stringify(nextFormatLayouts))
  //   }

  //   defaultState.layouts = nextFormatLayouts
  //   defaultState.tickersVolumeUnit = isPaperTrading ? VOLUME_UNIT_PAPER.TESTUSD : VOLUME_UNIT.USD
  // } catch (e) {
  //   debug('Loading layouts error, check localStorage: %s', LAYOUTS_KEY)
  // }

  try {
    defaultState.layoutComponentState = JSON.parse(layoutsComponentStateJSON)
  } catch (e) {
    debug('Loading layouts state error, check localStorage: %s', LAYOUTS_STATE_KEY)
  }

  // if (!defaultState.layouts) {
  //   defaultState.layouts = {
  //     [DEFAULT_TRADING_KEY]: DEFAULT_TRADING_LAYOUT,
  //     [DEFAULT_MARKET_KEY]: DEFAULT_MARKET_DATA_LAYOUT,
  //   }
  // }

  if (!defaultState.layoutComponentState) {
    defaultState.layoutComponentState = {
      [DEFAULT_TRADING_KEY]: DEFAULT_TRADING_COMPONENT_STATE,
      [DEFAULT_MARKET_KEY]: DEFAULT_MARKET_DATA_COMPONENT_STATE,
    }
  }

  defaultState.isPaperTrading = isPaperTrading

  return defaultState
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = {} } = action

  switch (type) {
    case types.SAVE_REMOTE_VERSION: {
      const { version } = payload

      return {
        ...state,
        remoteVersion: version,
      }
    }

    case types.UPDATE_SETTINGS: {
      return {
        ...state,
        settings: payload,
      }
    }

    case types.OPEN_NOTIFICATIONS: {
      return {
        ...state,
        notificationsVisible: true,
      }
    }

    case types.CLOSE_NOTIFICATIONS: {
      return {
        ...state,
        notificationsVisible: false,
      }
    }

    case types.SWITCH_NOTIFICATIONS: {
      return {
        ...state,
        notificationsVisible: !state.notificationsVisible,
      }
    }

    case types.SAVE_COMPONENT_STATE: {
      const {
        layoutID, componentID, state: componentState = {},
      } = payload

      return {
        ...state,
        layoutComponentState: {
          ...state.layoutComponentState,
          [layoutID]: {
            ...(state.layoutComponentState[layoutID] || {}),
            [componentID]: componentState,
          },
        },
      }
    }

    case types.UPDATE_COMPONENT_STATE: {
      const {
        layoutID, componentID, state: componentState = {},
      } = payload

      return {
        ...state,
        layoutComponentState: {
          ...state.layoutComponentState,
          [layoutID]: {
            ...(state.layoutComponentState[layoutID] || {}),
            [componentID]: {
              ...(_get(state, ['layoutComponentState', layoutID, componentID], {})),
              ...componentState,
            },
          },
        },
      }
    }

    case types.SET_ACTIVE_MARKET: {
      const { market } = payload

      return {
        ...state,
        previousMarket: state.activeMarket,
        activeMarket: market,
      }
    }
    case types.SET_MARKET_FROM_STORE: {
      const { isPaperTrading } = payload
      const mode = isPaperTrading ? PAPER_MODE : MAIN_MODE
      const activeMarketJSON = localStorage.getItem(isPaperTrading ? ACTIVE_MARKET_PAPER_KEY : ACTIVE_MARKET_KEY)
      const activeMarket = JSON.parse(activeMarketJSON) || DEFAULT_ACTIVE_MARKET_STATE[mode].activeMarket

      return {
        ...state,
        previousMarket: state.activeMarket,
        currentMode: mode,
        activeMarket,
      }
    }

    case types.SET_FILTRED_VALUE: {
      const { key, value } = payload
      return {
        ...state,
        [key]: value,
      }
    }

    case types.FIRST_LOGIN: {
      return {
        ...state,
        firstLogin: true,
      }
    }
    case types.FINISH_GUIDE: {
      const page = payload
      return {
        ...state,
        [`${page}_GUIDE_ACTIVE`]: false,
      }
    }
    case types.UPDATE_STRATEGY_CONTENT: {
      const { content = {} } = payload

      return {
        ...state,
        content: {
          id: state.content.id,
          ...content,
        },
      }
    }
    case types.UPDATE_STRATEGY_ID: {
      const { id } = payload
      return {
        ...state,
        content: {
          ...state.content,
          id,
        },
      }
    }
    case types.CLEAR_STRATEGIES: {
      return {
        ...state,
        content: {},
      }
    }
    case types.SET_TRADING_MODE: {
      const { isPaperTrading } = payload
      const mode = isPaperTrading ? PAPER_MODE : MAIN_MODE
      return {
        ...state,
        isPaperTrading,
        currentMode: mode,
      }
    }
    case types.CHANGE_TRADING_MODAL_STATE: {
      const { isVisible } = payload
      return {
        ...state,
        isTradingModeModalVisible: isVisible,
      }
    }
    case types.CHANGE_BAD_INTERNET_STATE: {
      const { isVisible } = payload
      return {
        ...state,
        isBadInternetConnection: isVisible,
      }
    }
    case types.SET_IS_ORDER_EXECUTING: {
      const { executing } = payload
      return {
        ...state,
        isOrderExecuting: executing,
      }
    }
    case types.CHANGE_REFILL_BALANCE_MODAL_STATE: {
      const { isVisible } = payload

      return {
        ...state,
        isRefillBalanceModalVisible: isVisible,
      }
    }
    case types.CHANGE_OLD_FORMAT_MODAL_STATE: {
      const { isVisible } = payload

      return {
        ...state,
        isOldFormatModalVisible: isVisible,
      }
    }
    case types.CHANGE_TICKERS_VOLUME_UNIT: {
      const { key } = payload
      const { isPaperTrading } = state
      const unit = isPaperTrading ? VOLUME_UNIT_PAPER[key] : VOLUME_UNIT[key]

      return { ...state, tickersVolumeUnit: unit || 'SELF' }
    }

    /**
     * Layout cases
     */
    case types.SET_LAYOUTS: {
      const { layouts } = payload
      return {
        ...state,
        layouts: {
          [DEFAULT_TRADING_LAYOUT.id]: DEFAULT_TRADING_LAYOUT,
          [DEFAULT_MARKET_DATA_LAYOUT.id]: DEFAULT_MARKET_DATA_LAYOUT,
          ...layouts,
        },
        isWsLayoutsSet: true,
      }
    }

    case types.ADD_COMPONENT: {
      const { component } = payload
      const layoutDef = getActiveLayoutDef(state)

      return {
        ...state,
        layoutIsDirty: true,
        unsavedLayout: {
          ...layoutDef,
          layout: [
            ...layoutDef.layout,
            {
              i: `${nonce()}`,
              c: component,
              x: _min(layoutDef.layout.map(l => l.x)) || 0,
              y: _max(layoutDef.layout.map(l => l.y)) || 0,
              ...COMPONENT_DIMENSIONS[component],
            },
          ],
        },
      }
    }

    case types.REMOVE_COMPONENT: {
      const { i } = payload
      const newLayoutDef = _cloneDeep(getActiveLayoutDef(state))
      const index = newLayoutDef.layout.findIndex(l => l.i === i)

      if (index >= 0) {
        newLayoutDef.layout.splice(index, 1)
      }

      return {
        ...state,
        layoutIsDirty: true,
        unsavedLayout: newLayoutDef,
      }
    }

    case types.CHANGE_LAYOUT: {
      const { incomingLayout } = payload
      const layoutDef = getActiveLayoutDef(state)

      // happens on deletion before we set the next layout
      if (_isEmpty(layoutDef) || _isEmpty(layoutDef.layout)) {
        return state
      }

      const currentLayout = layoutDefToGridLayout(layoutDef)
      const newLayout = layoutDefToGridLayout({ layout: incomingLayout })
      const setIsDirty = !_isEqual(currentLayout, newLayout)

      return {
        ...state,
        ...setIsDirty && { layoutIsDirty: true },
        unsavedLayout: gridLayoutToLayoutDef({
          ...layoutDef,
          layout: incomingLayout,
        }, layoutDef),
      }
    }

    case types.SET_LAYOUT_ID: {
      const { layoutID } = payload

      return {
        ...state,
        layoutID,
      }
    }

    case types.SELECT_LAYOUT: {
      const { id } = payload

      return {
        ...state,
        unsavedLayout: null,
        layoutID: id,
      }
    }

    case types.CREATE_LAYOUT: {
      const { name } = payload
      const layoutDef = getActiveLayoutDef(state)
      const id = `${layoutDef.routePath}:${name}`

      return {
        ...state,
        layoutIsDirty: false,
        layouts: {
          ...state.layouts,
          [id]: {
            ...layoutDef,
            id,
            name,
            isDefault: false,
            canDelete: true,
            savedAt: Date.now(),
          },
        },
        layoutID: id,
      }
    }

    case types.SAVE_LAYOUT: {
      return {
        ...state,
        layoutIsDirty: false,
        layouts: {
          ...state.layouts,
          [state.layoutID]: {
            ...state.unsavedLayout,
            isDefault: false,
            canDelete: true,
            savedAt: Date.now(),
          },
        },
      }
    }

    case types.STORE_UNSAVED_LAYOUT: {
      const { layout } = payload

      return {
        ...state,
        unsavedLayout: layout,
      }
    }

    case types.DELETE_LAYOUT: {
      const { id } = payload
      const { [id]: delLayout, ...remainingLayouts } = state.layouts
      const { [id]: delState, ...remainingStates } = state.layoutComponentState

      return {
        ...state,
        layouts: remainingLayouts,
        layoutComponentState: remainingStates,
      }
    }

    default: {
      return state
    }
  }
}

function reducerWithStorage(state = getInitialState(), action = {}) {
  const newState = reducer(state, action)

  if (localStorage) {
    switch (action.type) {
      case types.SAVE_LAYOUT:
      case types.CREATE_LAYOUT:
      case types.DELETE_LAYOUT: {
        const { layouts } = newState
        localStorage.setItem(LAYOUTS_KEY, JSON.stringify(layouts))
        break
      }

      case types.SAVE_COMPONENT_STATE: {
        const { layoutComponentState } = newState
        localStorage.setItem(LAYOUTS_STATE_KEY, JSON.stringify(layoutComponentState))
        break
      }
      case types.UPDATE_COMPONENT_STATE: {
        const { layoutComponentState } = newState
        localStorage.setItem(LAYOUTS_STATE_KEY, JSON.stringify(layoutComponentState))
        break
      }
      case types.SET_TRADING_MODE: {
        const { isPaperTrading } = newState
        localStorage.setItem(IS_PAPER_TRADING, isPaperTrading)
        break
      }

      case types.SET_ACTIVE_MARKET: {
        const { activeMarket, isPaperTrading } = newState
        localStorage.setItem(isPaperTrading ? ACTIVE_MARKET_PAPER_KEY : ACTIVE_MARKET_KEY, JSON.stringify(activeMarket))
        break
      }

      default: {
        break
      }
    }
  }

  return newState
}

export default reducerWithStorage
