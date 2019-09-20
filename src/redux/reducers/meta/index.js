import { combineReducers } from 'redux'

import exchanges from './exchanges'
import markets from './markets'

const reducers = combineReducers({
  exchanges,
  markets,
})

export default reducers
