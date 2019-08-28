import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { REDUCER_PATHS } from '../config'

import ui from './ui'
import data from './data'
import bfxData from './bfx'
import meta from './meta'
import wsDTCServer from './ws_dtc_server'

const reducers = (history) => combineReducers({
  [REDUCER_PATHS.ROUTER]: connectRouter(history),
  [REDUCER_PATHS.WS_DTC_SERVER]: wsDTCServer,
  [REDUCER_PATHS.META]: meta,
  [REDUCER_PATHS.BFX_DATA]: bfxData,
  [REDUCER_PATHS.DATA]: data,
  [REDUCER_PATHS.UI]: ui,
})

export default reducers
