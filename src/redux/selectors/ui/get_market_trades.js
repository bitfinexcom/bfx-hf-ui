import _get from 'lodash/get'
import _map from 'lodash/map'
import _filter from 'lodash/filter'

import getLayouts from './get_layouts'
import getComponentState from './get_component_state'
import { DEFAULT_MARKET_KEY } from '../../reducers/ui'

const TRADES_NAME = 'TRADES_TABLE'

export default (state) => {
  const layouts = getLayouts(state)
  const marketLayout = _get(layouts, [DEFAULT_MARKET_KEY, 'layout'])
  const tradesComponents = _filter(marketLayout, ({ c }) => c === TRADES_NAME)
  const tradesComponentsState = _map(tradesComponents, ({ i: id }) => {
    return getComponentState(state, DEFAULT_MARKET_KEY, 'trades', id)
  })

  return tradesComponentsState
}
