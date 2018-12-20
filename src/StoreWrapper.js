import React from 'react'
import { Provider } from 'react-redux'
import { routerReducer } from 'react-router-redux'
import { configureStore } from 'bfxuilib/dist/redux'
// import { configureStore } from './redux'

import sagas from './redux/sagas'
import dataReducer from './redux/reducers/data'
import hfSocketReducer from './redux/reducers/ws-hf-server'
import hfSocketMiddleware from './redux/middleware/ws-hf-server'

const config = {
  development: true,
  sagas,
}

const optionalReducers = {
  router: routerReducer,
  socketHF: hfSocketReducer,
  dataHF: dataReducer,
}

const optionalMiddleware = [
  hfSocketMiddleware()
]

const store = configureStore(
  config,
  optionalReducers,
  optionalMiddleware
)

window._store = store

export default class StoreWrapper extends React.PureComponent {
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}
