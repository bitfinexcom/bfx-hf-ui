import React from 'react'
import { Provider } from 'react-redux'
import { routerReducer } from 'react-router-redux'
import sagas from './redux/sagas'

import { configureStore } from './redux'

const config = {
  development: true,
  sagas,
}

const optionalReducers = { router: routerReducer }
const store = configureStore(
  config,
  optionalReducers,
)

export default class StoreWrapper extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}
