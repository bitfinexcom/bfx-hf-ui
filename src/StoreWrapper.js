import React from 'react'
import { Provider } from 'react-redux'
import { history, configureStore } from './redux'
import { ConnectedRouter } from 'connected-react-router'

import sagas from './redux/sagas'
import wsHFMiddleware from './redux/middleware/ws_hf_server'
import wsDTCMiddleware from './redux/middleware/ws_dtc_server'

const config = {
  development: true,
  sagas,
}

const optionalMiddleware = [
  wsHFMiddleware(),
  wsDTCMiddleware(),
]

const store = configureStore(
  config,
  optionalMiddleware,
)

window._store = store

export default class StoreWrapper extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {this.props.children}
        </ConnectedRouter>
      </Provider>
    )
  }
}
