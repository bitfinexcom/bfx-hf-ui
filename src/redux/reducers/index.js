import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { REDUCER_PATHS } from '../config'

import ui from './ui'
import meta from './meta'
import ws from './ws'

const reducers = history => combineReducers({
  [REDUCER_PATHS.ROUTER]: connectRouter(history),
  [REDUCER_PATHS.WS]: ws,
  [REDUCER_PATHS.META]: meta,
  [REDUCER_PATHS.UI]: ui,
})

export default reducers
