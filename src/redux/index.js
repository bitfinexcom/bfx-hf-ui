import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import Debug from 'debug'

import createRootReducer from './reducers'

const debug = Debug('hfui:rx')
const sagaMiddleware = createSagaMiddleware()

export const history = createHashHistory()

export function configureStore(
  options = {},
  optionalMiddleware = null,
) {
  const {
    development = false,
  } = options

  let middleware = [
    routerMiddleware(history),
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
    createRootReducer(history),
    {},
    enhancers,
  )

  sagaMiddleware.run(sagas)

  return store
}

export function runSaga() {
  debug('runSaga is deprecated: it is already run in configureStore')
}

export default {
  configureStore,
  runSaga,
}
