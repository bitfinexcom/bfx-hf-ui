import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'

const sagaMiddleware = createSagaMiddleware()

export const history = createBrowserHistory()

/**
 * Redux store
 *
 * @typedef {object} ReduxStore
 * @property {Function} getState - returns state
 */

/**
 * @param {object} options - options
 * @param {Array} [optionalMiddleware=null] - optional middleware
 * @returns {ReduxStore} store
 */
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

export default {
  configureStore,
}
