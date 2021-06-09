import _filter from 'lodash/filter'
import _map from 'lodash/map'
import _get from 'lodash/get'

import getCurrUnsavedLayout from './get_current_unsaved_layout'
import getComponentState from './get_component_state'
import { DEFAULT_MARKET_KEY } from '../../reducers/ui'

const BOOK_NAME = 'ORDER_BOOK'

export default (state) => {
  const currendUnsavedLayout = _get(getCurrUnsavedLayout(state), 'layout', [])
  const bookComponents = _filter(currendUnsavedLayout, ({ c }) => c === BOOK_NAME)
  const bookComponentsState = _map(bookComponents, ({ i: id }) => {
    return getComponentState(state, DEFAULT_MARKET_KEY, 'book', id)
  })

  return bookComponentsState
}
