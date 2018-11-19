import { combineReducers } from 'redux'

import data from './data'
import socketHF from './ws-hf-server'

const reducers = (optionalReducers) => combineReducers({
  socketHF,
  data,

  ...optionalReducers
})

export default reducers
