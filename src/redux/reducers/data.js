import { combineReducers } from 'redux'

import trades from './trades'
import candles from './candles'
import markets from './markets'
import bts from './bts'

const reducers = combineReducers({
  trades,
  candles,
  markets,
  bts,
})

export default reducers
