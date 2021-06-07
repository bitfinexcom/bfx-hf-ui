import types from '../constants/ui'

const saveRemoteVersion = version => ({
  type: types.SAVE_REMOTE_VERSION,
  payload: {
    version,
  },
})

const saveLayout = (layout, id) => ({
  type: types.SAVE_LAYOUT,
  payload: {
    layout,
    id,
  },
})

const storeUnsavedLayout = (layout) => ({
  type: types.STORE_UNSAVED_LAYOUT,
  payload: {
    layout,
  },
})

const createLayout = (id, tradingEnabled) => ({
  type: types.CREATE_LAYOUT,
  payload: {
    id,
    tradingEnabled,
  },
})

const deleteLayout = id => ({
  type: types.DELETE_LAYOUT,
  payload: {
    id,
  },
})

const setActiveMarket = market => ({
  type: types.SET_ACTIVE_MARKET,
  payload: {
    market,
  },
})

const setFilteredValueWithKey = (key, value) => ({
  type: types.SET_FILTRED_VALUE,
  payload: {
    key,
    value,
  },
})

const saveComponentState = ({
  layoutID,
  componentID,
  state,
}) => ({
  type: types.SAVE_COMPONENT_STATE,
  payload: {
    state,
    layoutID,
    componentID,
  },
})

const updateComponentState = ({
  layoutID,
  componentID,
  state,
}) => ({
  type: types.UPDATE_COMPONENT_STATE,
  payload: {
    layoutID,
    componentID,
    state,
  },
})

const setRoute = route => ({
  type: types.SET_ROUTE,
  payload: {
    route,
  },
})

const closeNotificationPanel = () => ({
  type: types.CLOSE_NOTIFICATIONS,
})

const removeNotification = (uid) => ({
  type: types.REMOVE_NOTIFICATION,
  payload: {
    uid,
  },
})

const clearNotifications = () => ({
  type: types.CLEAR_NOTIFICATIONS,
})

const openNotifcationPanel = () => ({
  type: types.OPEN_NOTIFICATIONS,
})

const firstLogin = () => ({
  type: types.FIRST_LOGIN,
})

const finishGuide = (page) => ({
  type: types.FINISH_GUIDE,
  payload: page,
})

const recvNotification = notification => ({
  type: types.DATA_NOTIFICATION,
  payload: { notification },
})

const strategySelect = () => ({
  type: types.STRATEGY_SELECT,
})

const updateStrategyContent = content => ({
  type: types.UPDATE_STRATEGY_CONTENT,
  payload: { content },
})

const updateStrategyId = id => ({
  type: types.UPDATE_STRATEGY_ID,
  payload: { id },
})

const setTradingMode = (isPaperTrading) => ({
  type: types.SET_TRADING_MODE,
  payload: { isPaperTrading },
})

const setMarketFromStore = (isPaperTrading) => ({
  type: types.SET_MARKET_FROM_STORE,
  payload: { isPaperTrading },
})

const changeTradingModeModalState = (isVisible) => ({
  type: types.CHANGE_TRADING_MODAL_STATE,
  payload: { isVisible },
})

const changeBadInternetConnectionState = (isVisible) => ({
  type: types.CHANGE_BAD_INTERNET_STATE,
  payload: { isVisible },
})

const setIsOrderExecuting = (executing) => ({
  type: types.SET_IS_ORDER_EXECUTING,
  payload: { executing },
})

const changeReffilBalanceModalState = isVisible => ({
  type: types.CHANGE_REFILL_BALANCE_MODAL_STATE,
  payload: { isVisible },
})

export default {
  setRoute,
  saveLayout,
  storeUnsavedLayout,
  createLayout,
  deleteLayout,
  setActiveMarket,
  saveComponentState,
  updateComponentState,
  saveRemoteVersion,
  closeNotificationPanel,
  removeNotification,
  clearNotifications,
  openNotifcationPanel,
  firstLogin,
  finishGuide,
  setFilteredValueWithKey,
  recvNotification,
  strategySelect,
  updateStrategyContent,
  updateStrategyId,
  setTradingMode,
  setMarketFromStore,
  changeTradingModeModalState,
  changeReffilBalanceModalState,
  changeBadInternetConnectionState,
  setIsOrderExecuting,
}
