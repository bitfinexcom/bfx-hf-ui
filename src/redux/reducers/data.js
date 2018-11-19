import { combineReducers } from 'redux'

import apiKey from './apikey'
import trades from './trades'
import candles from './candles'
import markets from './markets'
import bts from './bts'
import bfx from './bfx_data'
import algoOrders from './algo_orders'

const reducers = combineReducers({
  bfx,
  apiKey,
  trades,
  candles,
  markets,
  algoOrders,
  bts,
})

export default reducers
