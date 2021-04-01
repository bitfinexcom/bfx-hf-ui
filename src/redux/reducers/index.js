import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reduxReducers } from 'ufx-ui'
import { REDUCER_PATHS, UFX_REDUCER_PATHS } from '../config'

import ui from './ui'
import meta from './meta'
import ws from './ws'
import notifications from './notifications'
import algoOrders from './ao'

const reducers = history => combineReducers({
  [REDUCER_PATHS.ROUTER]: connectRouter(history),
  [REDUCER_PATHS.WS]: ws,
  [REDUCER_PATHS.META]: meta,
  [REDUCER_PATHS.UI]: ui,
  [REDUCER_PATHS.NOTIFICATIONS]: notifications,
  [REDUCER_PATHS.AOS]: algoOrders,
  [UFX_REDUCER_PATHS.UFX]: combineReducers({
    [UFX_REDUCER_PATHS.WS]: reduxReducers.ws,
    [UFX_REDUCER_PATHS.BOOK]: reduxReducers.book,
  }),
})

export default reducers
