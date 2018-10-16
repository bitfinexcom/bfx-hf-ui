import { combineReducers } from 'redux'

import data from './data'
import socket from './ws'

const reducers = (optionalReducers) => combineReducers({
  socket,
  data,

  ...optionalReducers
})

export default reducers
