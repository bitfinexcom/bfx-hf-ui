import _reduce from 'lodash/reduce'
import { createSelector } from 'reselect'

import getFavoritePairsArray from './get_favorite_pairs'

export const getFavoritePairsObject = createSelector(
  getFavoritePairsArray,
  (favoritesArray) => _reduce(favoritesArray, (acc, pair) => {
    acc[pair] = true
    return acc
  }, {}),
)

export default getFavoritePairsObject
