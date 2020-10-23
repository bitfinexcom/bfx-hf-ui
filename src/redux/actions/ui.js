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

const setActiveExchange = (exchange, market) => ({
  type: types.SET_ACTIVE_EXCHANGE,
  payload: { exchange, market },
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

const setRoute = route => ({
  type: types.SET_ROUTE,
  payload: {
    route,
  },
})

const closeNotificationPanel = () => ({
  type: types.CLOSE_NOTIFICATIONS,
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

const strategySelect = content => ({
  type: types.STRATEGY_SELECT,
  payload: { content },
})

export default {
  setRoute,
  saveLayout,
  createLayout,
  deleteLayout,
  setActiveMarket,
  saveComponentState,
  setActiveExchange,
  saveRemoteVersion,
  closeNotificationPanel,
  openNotifcationPanel,
  firstLogin,
  finishGuide,
  setFilteredValueWithKey,
  recvNotification,
  strategySelect,
}
