import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import constants from './constants'
import actions from './actions'
import selectors from './selectors'
import dataSocketMiddleware from './middleware/ws-data-server'
import bfxSocketMiddleware from './middleware/ws-bfx'

const sagaMiddleware = createSagaMiddleware()

export function configureStore(
  options = {},
  optionalReducers = {},
  optionalMiddleware = null,
) {
  const {
    development = false,
  } = options

  let middleware = [
    dataSocketMiddleware(),
    bfxSocketMiddleware(),
    sagaMiddleware,
  ]

  if (optionalMiddleware) {
    middleware = [...middleware, ...optionalMiddleware]
  }

  const composeEnhancers = development
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose

  const sagas = options.sagas ? options.sagas : function* saga() {}

  const enhancers = composeEnhancers(
    applyMiddleware(...middleware),
  )

  const store = createStore(
    reducer(optionalReducers),
    {},
    enhancers,
  )

  sagaMiddleware.run(sagas)

  return store
}

export function runSaga() {
  console.log('runSaga is deprecated: it is already run in configureStore')
}

export default {
  configureStore,
  actions,
  constants,
  runSaga,
  selectors,
}
