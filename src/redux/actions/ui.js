import types from '../constants/ui'

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

export default {
  setRoute,
  saveLayout,
  createLayout,
  deleteLayout,
  setActiveMarket,
  saveComponentState,
  setActiveExchange,
}
