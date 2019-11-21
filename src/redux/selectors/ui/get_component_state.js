import _get from 'lodash/get'
import defaultStateForComponentType from './default_state_for_component_type'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.UI

export default (state, layoutID, componentType, id) => {
  return _get(
    state,
    `${path}.layoutComponentState.${layoutID}.${id}`,
    defaultStateForComponentType(state, componentType),
  )
}
