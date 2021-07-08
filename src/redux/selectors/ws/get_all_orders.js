import _get from 'lodash/get'
import _map from 'lodash/map'
import _find from 'lodash/find'
import { createSelector } from 'reselect'
import { REDUCER_PATHS } from '../../config'
import { getMarkets } from '../meta'

const path = REDUCER_PATHS.WS

const atomicOrders = (state) => {
  return _get(state, `${path}.orders`, [])
}
const allMarkets = state => getMarkets(state)

const atomicOrdersWithReplacedPairs = createSelector([allMarkets, atomicOrders], (markets, orders) => {
  return _map(orders, (order) => {
    const currentMarket = _find(markets, (market) => market.wsID === order.symbol)
    return { ...order, symbol: currentMarket.uiID }
  }, [])
})

export default atomicOrdersWithReplacedPairs
