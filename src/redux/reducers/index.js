import { combineReducers } from 'redux'

import data from './data'
import socketHF from './ws-hf-server'
import editor from './editor'
import algoOrders from './algo-orders'
import appData from './app-data'

const reducers = optionalReducers => combineReducers({
  socketHF,
  data,
  algoOrders,
  editor,
  appData,
  ...optionalReducers,
})

export default reducers
