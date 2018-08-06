import { combineReducers } from 'redux'

import data from './data'
import socket from './ws'
import trades from './trades'
import candles from './candles'

const reducers = (optionalReducers) => combineReducers({
  socket,
  data,

  ...optionalReducers,
})

export default reducers
