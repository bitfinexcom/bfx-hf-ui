import types from '../constants/market'

const changeSubscriptions = (market) => ({
  type: types.CHANGE_SUBSCRIPTIONS,
  payload: {
    market,
  }
})

export default { changeSubscriptions }
