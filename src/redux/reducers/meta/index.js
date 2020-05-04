import { combineReducers } from 'redux'

import exchanges from './exchanges'
import markets from './markets'
import rest from './rest'
import ReactGA from './google_analytics'

const reducers = combineReducers({
  exchanges,
  markets,
  rest,
  ReactGA,
})

export default reducers
