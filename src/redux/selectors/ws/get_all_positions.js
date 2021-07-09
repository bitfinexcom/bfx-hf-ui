import _get from 'lodash/get'
import _map from 'lodash/map'
import _find from 'lodash/find'
import { createSelector } from 'reselect'
import { REDUCER_PATHS } from '../../config'
import { getMarkets } from '../meta'

const path = REDUCER_PATHS.WS

const EMPTY_ARR = []

const allPositions = (state) => {
  return _get(state, `${path}.positions`, EMPTY_ARR)
}

const allMarkets = state => getMarkets(state)

const positionWithReplacedPairs = createSelector([allMarkets, allPositions], (markets, positions) => {
  return _map(positions, (position) => {
    const currentMarket = _find(markets, (market) => market.wsID === position.symbol)
    return { ...position, symbol: currentMarket.uiID }
  }, [])
})

export default positionWithReplacedPairs
