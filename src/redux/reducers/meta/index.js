import { combineReducers } from 'redux'

import exchanges from './exchanges'
import markets from './markets'
import rest from './rest'

const reducers = combineReducers({
  exchanges,
  markets,
  rest,
})

export default reducers
