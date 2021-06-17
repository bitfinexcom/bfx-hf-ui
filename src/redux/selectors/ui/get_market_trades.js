import _get from 'lodash/get'
import _map from 'lodash/map'
import _filter from 'lodash/filter'

import { createSelector } from 'reselect'
import { getLayoutState } from './get_component_state'
import getCurrUnsavedLayout from './get_current_unsaved_layout'
import { DEFAULT_MARKET_KEY } from '../../reducers/ui'
import { COMPONENT_TYPES } from '../../../components/GridLayout/GridLayout.helpers'

const EMPTY_ARR = []

const getMarketTradesComponents = createSelector(
  [
    getCurrUnsavedLayout,
    (state) => getLayoutState(state, DEFAULT_MARKET_KEY),
  ],
  (currUnsavedLayout, layoutState) => {
    const currentUnsavedLayout = _get(currUnsavedLayout, 'layout', EMPTY_ARR)
    const tradesComponents = _filter(currentUnsavedLayout, ({ c }) => c === COMPONENT_TYPES.TRADES_TABLE)
    const tradesComponentsState = _map(tradesComponents, ({ i: id }) => _get(layoutState, id))

    return tradesComponentsState
  },
)

export default getMarketTradesComponents
