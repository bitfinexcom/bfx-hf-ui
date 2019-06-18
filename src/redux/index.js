import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import constants from './constants'
import actions from './actions'
import selectors from './selectors'
import hfSocketMiddleware from './middleware/ws-hf-server'

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
    hfSocketMiddleware(),
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
  console.log('%c runSaga is deprecated: it is already run in configureStore', 'color:white;background:orange;')
}

export default {
  configureStore,
  actions,
  constants,
  runSaga,
  selectors,
}
