import { createSelector } from 'reselect'

import getFilteredPositions from './get_filtered_positions'

const getPositionsCount = createSelector(
  getFilteredPositions,
  (getPositions) => (activeFilter) => getPositions(activeFilter)?.length,
)

export default getPositionsCount
