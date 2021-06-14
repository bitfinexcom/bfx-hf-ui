import _map from 'lodash/map'
import { createSelector } from 'reselect'
import { getMarkets } from '.'

const getMarketTickersKeys = createSelector([getMarkets], (markets) => _map(markets, (market) => market.wsID, []))

export default getMarketTickersKeys
