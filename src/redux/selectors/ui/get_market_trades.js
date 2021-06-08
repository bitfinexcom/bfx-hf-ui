import _get from 'lodash/get'
import _map from 'lodash/map'
import _filter from 'lodash/filter'

import getComponentState from './get_component_state'
import getCurrUnsavedLayout from './get_current_unsaved_layout'
import { DEFAULT_MARKET_KEY } from '../../reducers/ui'

const TRADES_NAME = 'TRADES_TABLE'

export default (state) => {
  const currendUnsavedLayout = _get(getCurrUnsavedLayout(state), 'layout', [])
  const tradesComponents = _filter(currendUnsavedLayout, ({ c }) => c === TRADES_NAME)
  const tradesComponentsState = _map(tradesComponents, ({ i: id }) => {
    return getComponentState(state, DEFAULT_MARKET_KEY, 'trades', id)
  })

  return tradesComponentsState
}
