import { combineReducers } from 'redux'

import trades from './trades'
import candles from './candles'
import markets from './markets'

const reducers = combineReducers({
  trades,
  candles,
  markets,
})

export default reducers
