import { combineReducers } from 'redux'

import apiKey from './apikey'
import bfx from './bfx-data'
import algoOrders from './algo-orders'

const reducers = combineReducers({
  bfx,
  apiKey,
  algoOrders,
})

export default reducers
