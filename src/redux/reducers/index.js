import { combineReducers } from 'redux'

import data from './data'
import socketDS from './ws-data-server'
import socketBFX from './ws-bfx'

const reducers = (optionalReducers) => combineReducers({
  socketBFX,
  socketDS,
  data,

  ...optionalReducers
})

export default reducers
