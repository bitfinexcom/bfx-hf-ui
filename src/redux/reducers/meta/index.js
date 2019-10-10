import { combineReducers } from 'redux'

import exchanges from './exchanges'
import markets from './markets'
import data from './data'

const reducers = combineReducers({
  exchanges,
  markets,
  data,
})

export default reducers
