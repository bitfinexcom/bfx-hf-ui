import _get from 'lodash/get'
import { createSelector } from 'reselect'
import getDefaultStateForComponentType from './default_state_for_component_type'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.UI

const EMPTY_OBJ = {}

const getState = (state) => _get(state, [path, 'layoutComponentState'], EMPTY_OBJ)

const getLayoutState = createSelector(
  [
    getState,
    (_, layoutID) => layoutID,
  ],
  (state, layoutID) => _get(state, layoutID, EMPTY_OBJ),
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
