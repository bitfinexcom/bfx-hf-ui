import _isArray from 'lodash/isArray'
// import bfxDataActions from 'bfxuilib/dist/redux/actions/data.actions'

import WSHFActions from '../../actions/ws-hf-server'
import axios from 'axios'
export default (ws, store) => (e = {}) => {
  const { data = '' } = e
  let payload
  try {
    payload = JSON.parse(data)
  } catch (e) {
    console.error('[wss] error parsing JSON: ', e)
    return
  }

  if (!_isArray(payload)) {
    console.error('[wss] recv invalid ws payload: ', payload)
    return
  }

  const [scope, msg] = payload
  switch (scope) {
    case 'error': {
      console.error('[wss] error ', payload)
      return store.dispatch(WSHFActions.error(payload))
    }
    case 'as': {
      const response = payload[1]
      const [event, orders] = response
      if (event === 'data.aos') {
        console.log(msg)
        store.dispatch({ type: 'RECEIVE_ORDERS', payload: orders })
      }
      return
    }
    case 'ds': { // data server
      const [type] = msg
      if (type === 'bfx') {
        const action = WSHFActions.recvBitfinex(msg)
        store.dispatch(action)
        // Handle auth sub mock action
        if (action.type === 'WSS_AUTH_RESPONSE') {
          // store.dispatch(bfxDataActions.subscribed(action.payload))
        }
        return
      }
      store.dispatch(WSHFActions.recvDataServer(msg))
      return
    }
    default: {
      store.dispatch(WSHFActions.data(payload))
    }
  }
}
