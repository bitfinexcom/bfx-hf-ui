import { combineReducers } from 'redux'

import apiKey from './apikey'
import trades from './trades'
import candles from './candles'
import markets from './markets'
import bts from './bts'
import bfx from './bfx-data'

const reducers = combineReducers({
  bfx,
  apiKey,
  trades,
  candles,
  markets,
  bts,
})

export default reducers
