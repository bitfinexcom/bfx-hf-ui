import types from '../constants/market'

const changeSubscriptions = market => ({
  type: types.CHANGE_SUBSCRIPTIONS,
  payload: {
    market,
  },
})

const getCCYFullNames = () => ({
  type: types.GET_CCY_FULL_NAMES,
})

const setCCYFullNames = names => ({
  type: types.SET_CCY_FULL_NAMES,
  payload: { names },
})

export default { changeSubscriptions, setCCYFullNames, getCCYFullNames }
