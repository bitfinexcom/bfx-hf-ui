import types from '../../constants/ui'
import DEFAULT_TRADING_LAYOUT from './default_layout_trading'
import DEFAULT_MARKET_DATA_LAYOUT from './default_layout_market_data'
import DEFAULT_TRADING_COMPONENT_STATE from './default_component_state_trading'
import DEFAULT_MARKET_DATA_COMPONENT_STATE from './default_component_state_market_data'

const LAYOUTS_KEY = 'HF_UI_LAYOUTS'
const LAYOUTS_STATE_KEY = 'HF_UI_LAYOUTS_STATE'
const ACTIVE_MARKET_KEY = 'HF_UI_ACTIVE_MARKET'
const ACTIVE_EXCHANGE_KEY = 'HF_UI_ACTIVE_EXCHANGE'

const DEFAULT_ROUTE = '/'
const DEFAULT_EXCHANGE = 'bitfinex'
const DEFAULT_MARKET = {
  contexts: ['e', 'm'],
  restID: 'tBTCUSD',
  wsID: 'tBTCUSD',
  base: 'BTC',
  quote: 'USD',
  uiID: 'BTC/USD',
}

function getInitialState() {
  const defaultState = {
    route: DEFAULT_ROUTE,
    activeMarket: DEFAULT_MARKET,
    activeExchange: DEFAULT_EXCHANGE,
    notificationsVisible: false,
    previousMarket: null,
    previousExchange: null,
    remoteVersion: null,
    firstLogin: false,
  }

  if (!localStorage) {
    return defaultState
  }

  const layoutsJSON = localStorage.getItem(LAYOUTS_KEY)
  const layoutsComponentStateJSON = localStorage.getItem(LAYOUTS_STATE_KEY)
  const activeMarketJSON = localStorage.getItem(ACTIVE_MARKET_KEY)

  try {
    defaultState.layouts = JSON.parse(layoutsJSON)
  } catch (e) {
    console.error(`err load layouts, check storage ${LAYOUTS_KEY}`)
  }

  try {
    defaultState.layoutComponentState = JSON.parse(layoutsComponentStateJSON)
  } catch (e) {
    console.error(`err load layouts state, check storage ${LAYOUTS_STATE_KEY}`)
  }

  if (!defaultState.layouts) {
    defaultState.layouts = {
      'Default Trading': DEFAULT_TRADING_LAYOUT,
      'Default Market Data': DEFAULT_MARKET_DATA_LAYOUT,
    }
  }

  if (!defaultState.layoutComponentState) {
    defaultState.layoutComponentState = {
      'Default Trading': DEFAULT_TRADING_COMPONENT_STATE,
      'Default Market Data': DEFAULT_MARKET_DATA_COMPONENT_STATE,
    }
  }

  if (activeMarketJSON) {
    try {
      defaultState.activeMarket = JSON.parse(activeMarketJSON)
    } catch (e) {
      console.error(`err load active market, check storage ${ACTIVE_MARKET_KEY}`)
    }
  }

  if (localStorage.getItem(ACTIVE_EXCHANGE_KEY)) {
    defaultState.activeExchange = localStorage.getItem(ACTIVE_EXCHANGE_KEY)
  }

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

    case types.SAVE_LAYOUT: {
      const { layout, id } = payload

      return {
        ...state,

        layouts: {
          ...state.layouts,
          [id]: layout,
        },
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

    case types.CREATE_LAYOUT: {
      const { id, tradingEnabled } = payload

      return {
        ...state,

        layouts: {
          ...state.layouts,
          [id]: {
            canDelete: true,
            type: tradingEnabled ? 'trading' : 'data',
            layout: [],
          },
        },
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

    case types.SET_ACTIVE_MARKET: {
      const { market } = payload

      return {
        ...state,
        previousMarket: state.activeMarket,
        activeMarket: market,
      }
    }

    case types.SET_ACTIVE_EXCHANGE: {
      const { exchange, market } = payload

      return {
        ...state,
        previousMarket: state.activeMarket,
        previousExchange: state.activeExchange,
        activeExchange: exchange,
        activeMarket: market,
      }
    }

    case types.SET_ROUTE: {
      const { route } = payload

      return {
        ...state,
        route,
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

      case types.SET_ACTIVE_EXCHANGE: {
        const { activeExchange, activeMarket } = newState
        localStorage.setItem(ACTIVE_EXCHANGE_KEY, activeExchange)
        localStorage.setItem(ACTIVE_MARKET_KEY, JSON.stringify(activeMarket))
        break
      }

      case types.SET_ACTIVE_MARKET: {
        const { activeMarket } = newState
        localStorage.setItem(ACTIVE_MARKET_KEY, JSON.stringify(activeMarket))
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
