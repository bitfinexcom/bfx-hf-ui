import { combineReducers } from 'redux'

import data from './data'
import socketHF from './ws-hf-server'
import table from './table'
import editor from './editor'

const reducers = optionalReducers => combineReducers({
  socketHF,
  data,
  table,
  editor,
  ...optionalReducers,
})

export default reducers
