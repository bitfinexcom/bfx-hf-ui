import _get from 'lodash/get'
import _reduce from 'lodash/reduce'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.WS

export default (state) => {
  const favoritesArray = _get(state, `${path}.favoriteTradingPairs.favoritePairs`, [])
  const favoritesObject = _reduce(favoritesArray, (acc, pair) => {
    acc[pair] = true
    return acc
  }, {})

  return favoritesObject
}
