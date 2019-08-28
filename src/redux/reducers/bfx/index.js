import { combineReducers } from 'redux'

import notifications from './notifications'
import orderBooks from './order_books'
import positions from './positions'
import orders from './orders'

const reducers = combineReducers({
  notifications,
  orderBooks,
  positions,
  orders,
})

export default reducers
