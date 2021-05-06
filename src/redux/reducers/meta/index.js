import { combineReducers } from 'redux'

import markets from './markets'
import rest from './rest'

const reducers = combineReducers({
  markets,
  rest,
})

export default reducers
