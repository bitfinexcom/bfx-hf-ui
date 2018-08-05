import { combineReducers } from 'redux'

import trades from './trades'
import candles from './candles'

const reducers = combineReducers({
  trades,
  candles,
})

export default reducers
