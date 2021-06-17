import _get from 'lodash/get'
import { createSelector } from 'reselect'
import getDefaultStateForComponentType from './default_state_for_component_type'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.UI

const EMPTY_OBJ = {}

const getLayoutsState = (state) => _get(state, [path, 'layoutComponentState'], EMPTY_OBJ)

export const getLayoutState = createSelector(
  [
    getLayoutsState,
    (_, layoutID) => layoutID,
  ],
  (layoutsState, layoutID) => _get(layoutsState, layoutID, EMPTY_OBJ),
)

const getComponentState = createSelector(
  [
    (state, layoutID) => getLayoutState(state, layoutID),
    (state, __, componentType) => getDefaultStateForComponentType(state, componentType),
    (_, __, ___, componentID) => componentID,
  ],
  (layoutState, defComponentState, componentID) => _get(
    layoutState,
    componentID,
    defComponentState,
  ),
)

export default getComponentState
