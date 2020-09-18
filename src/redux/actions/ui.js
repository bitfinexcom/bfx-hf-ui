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

const toggleFeedbackModal = (status) => ({
  type: types.TOGGLE_FEEDBACK_MODAL,
  payload: status,
})

const changeLanguage = (lang) => ({
  type: types.СHANGE_LANGUAGE,
  payload: lang,
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
  toggleFeedbackModal,
  changeLanguage,
}
