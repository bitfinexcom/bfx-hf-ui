import _isEmpty from 'lodash/isEmpty'
import _filter from 'lodash/filter'
import { createSelector } from 'reselect'
import memoizeOne from 'memoize-one'

import getAllPositions from './get_all_positions'

const getFilteredPositions = createSelector(
  getAllPositions,
  (positions) => memoizeOne(activeFilter => {
    if (_isEmpty(activeFilter)) {
      return positions
    }

    return _filter(positions, p => p?.symbol === activeFilter?.wsID)
  }),
)

export default getFilteredPositions
