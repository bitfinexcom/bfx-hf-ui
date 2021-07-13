import _get from 'lodash/get'
import _map from 'lodash/map'
import { createSelector } from 'reselect'
import { REDUCER_PATHS } from '../../config'
import { getMarketsObject } from '../meta'

const path = REDUCER_PATHS.WS

const algoOrders = (state) => {
  return _get(state, `${path}.algoOrders`, [])
}
const allMarkets = state => getMarketsObject(state)

const algoOrdersWithReplacedPairs = createSelector([allMarkets, algoOrders], (markets, orders) => {
  return _map(orders, (order) => {
    const { symbol } = order.args
    const currentMarket = markets[symbol]
    return { ...order, args: { ...order.args, symbol: currentMarket.uiID } }
  }, [])
})

export default algoOrdersWithReplacedPairs
