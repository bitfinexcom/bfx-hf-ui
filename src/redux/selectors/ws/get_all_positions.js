import _get from 'lodash/get'
import _map from 'lodash/map'
import { createSelector } from 'reselect'
import { REDUCER_PATHS } from '../../config'
import { getMarketsObject } from '../meta'

const path = REDUCER_PATHS.WS

const EMPTY_ARR = []

const allPositions = (state) => {
  return _get(state, `${path}.positions`, EMPTY_ARR)
}

const allMarkets = state => getMarketsObject(state)

const positionWithReplacedPairs = createSelector([allMarkets, allPositions], (markets, positions) => {
  return _map(positions, (position) => {
    const { symbol } = position
    const currentMarket = markets[symbol]
    return { ...position, symbol: currentMarket.uiID }
  }, [])
})

export default positionWithReplacedPairs
