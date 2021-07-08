import _get from 'lodash/get'
import _map from 'lodash/map'
import _find from 'lodash/find'
import { createSelector } from 'reselect'
import { REDUCER_PATHS } from '../../config'
import { getMarkets } from '../meta'

const path = REDUCER_PATHS.UI

const filteredAtomicOrders = (state) => {
  const filteredAtomics = _get(state, `${path}.filteredAtomicOrders`, [])
  return filteredAtomics
}
const allMarkets = state => getMarkets(state)

const atomicOrdersWithReplacedPairs = createSelector([allMarkets, filteredAtomicOrders], (markets, orders) => {
  return _map(orders, (order) => {
    const currentMarket = _find(markets, (market) => market.wsID === order.symbol)
    return { ...order, symbol: currentMarket.uiID }
  }, [])
})

export default atomicOrdersWithReplacedPairs
