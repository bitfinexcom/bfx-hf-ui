import types from '../constants/ui'

export const saveRemoteVersion = version => ({
  type: types.SAVE_REMOTE_VERSION,
  payload: {
    version,
  },
})

export const saveLayout = () => ({
  type: types.SAVE_LAYOUT,
})

export const storeUnsavedLayout = (layout) => ({
  type: types.STORE_UNSAVED_LAYOUT,
  payload: {
    layout,
  },
})

export const selectLayout = (id) => ({
  type: types.SELECT_LAYOUT,
  payload: {
    id,
  },
})

export const createLayout = (id) => ({
  type: types.CREATE_LAYOUT,
  payload: {
    id,
  },
})

export const deleteLayout = id => ({
  type: types.DELETE_LAYOUT,
  payload: {
    id,
  },
})

export const setActiveMarket = market => ({
  type: types.SET_ACTIVE_MARKET,
  payload: {
    market,
  },
})

export const setFilteredValueWithKey = (key, value) => ({
  type: types.SET_FILTRED_VALUE,
  payload: {
    key,
    value,
  },
})

export const saveComponentState = ({
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

export const updateComponentState = ({
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

export const closeNotificationPanel = () => ({
  type: types.CLOSE_NOTIFICATIONS,
})

export const removeNotification = (uid) => ({
  type: types.REMOVE_NOTIFICATION,
  payload: {
    uid,
  },
})

export const removeNotifications = (uids) => ({
  type: types.REMOVE_NOTIFICATIONS,
  payload: {
    uids,
  },
})

export const clearNotifications = () => ({
  type: types.CLEAR_NOTIFICATIONS,
})

export const openNotifcationPanel = () => ({
  type: types.OPEN_NOTIFICATIONS,
})

export const switchNotifcationPanel = () => ({
  type: types.SWITCH_NOTIFICATIONS,
})

export const firstLogin = () => ({
  type: types.FIRST_LOGIN,
})

export const finishGuide = (page) => ({
  type: types.FINISH_GUIDE,
  payload: page,
})

export const recvNotification = notification => ({
  type: types.DATA_NOTIFICATION,
  payload: { notification },
})

export const strategySelect = () => ({
  type: types.STRATEGY_SELECT,
})

export const updateStrategyContent = content => ({
  type: types.UPDATE_STRATEGY_CONTENT,
  payload: { content },
})

export const updateStrategyId = id => ({
  type: types.UPDATE_STRATEGY_ID,
  payload: { id },
})

export const clearStrategies = () => ({
  type: types.CLEAR_STRATEGIES,
})

export const setTradingMode = (isPaperTrading) => ({
  type: types.SET_TRADING_MODE,
  payload: { isPaperTrading },
})

export const setMarketFromStore = (isPaperTrading) => ({
  type: types.SET_MARKET_FROM_STORE,
  payload: { isPaperTrading },
})

export const changeTradingModeModalState = (isVisible) => ({
  type: types.CHANGE_TRADING_MODAL_STATE,
  payload: { isVisible },
})

export const changeOldFormatModalState = (isVisible) => ({
  type: types.CHANGE_OLD_FORMAT_MODAL_STATE,
  payload: { isVisible },
})

export const changeBadInternetConnectionState = (isVisible) => ({
  type: types.CHANGE_BAD_INTERNET_STATE,
  payload: { isVisible },
})

export const setIsOrderExecuting = (executing) => ({
  type: types.SET_IS_ORDER_EXECUTING,
  payload: { executing },
})

export const changeReffilBalanceModalState = isVisible => ({
  type: types.CHANGE_REFILL_BALANCE_MODAL_STATE,
  payload: { isVisible },
})

export const setLayoutID = layoutID => ({
  type: types.SET_LAYOUT_ID,
  payload: { layoutID },
})

export const addComponent = (component) => ({
  type: types.ADD_COMPONENT,
  payload: { component },
})

export const removeComponent = (i) => ({
  type: types.REMOVE_COMPONENT,
  payload: { i },
})

export const changeLayout = (incomingLayout) => ({
  type: types.CHANGE_LAYOUT,
  payload: { incomingLayout },
})

export default {
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
  removeNotifications,
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
  clearStrategies,
  switchNotifcationPanel,
  setLayoutID,
  changeOldFormatModalState,
}
