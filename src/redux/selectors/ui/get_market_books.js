import _filter from 'lodash/filter'
import _map from 'lodash/map'
import _get from 'lodash/get'

import getLayouts from './get_layouts'
import getComponentState from './get_component_state'
import { DEFAULT_MARKET_KEY } from '../../reducers/ui'

const BOOK_NAME = 'ORDER_BOOK'

export default (state) => {
  const layouts = getLayouts(state)
  const marketLayout = _get(layouts, [DEFAULT_MARKET_KEY, 'layout'])
  const bookComponents = _filter(marketLayout, ({ c }) => c === BOOK_NAME)
  const bookComponentsState = _map(bookComponents, ({ i: id }) => {
    return getComponentState(state, DEFAULT_MARKET_KEY, 'book', id)
  })

  return bookComponentsState
}
