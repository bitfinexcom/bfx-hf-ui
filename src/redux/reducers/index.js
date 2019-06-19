import { combineReducers } from 'redux'

import data from './data'
import socketHF from './ws-hf-server'
import table from './table'

const reducers = optionalReducers => combineReducers({
  socketHF,
  data,
  table,
  ...optionalReducers
})

export default reducers
