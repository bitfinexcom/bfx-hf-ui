import _isArray from 'lodash/isArray'
// import bfxDataActions from 'bfxuilib/dist/redux/actions/data.actions'

import WSHFActions from '../../actions/ws-hf-server'

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
      const [, response] = payload
      const [, algoData] = response
      store.dispatch({ type: 'RECEIVE_ALGO_DATA', payload: algoData })
      return
    }
    case 'ds': { // data server
      const [type] = msg
      const response = msg[1] ? msg[1][2] : null
      if (Array.isArray(data) && data) {
        const event = response[1]
        if (event === 'ucm-submit-bfx-res-req') {
          store.dispatch(WSHFActions.send(['as', ['get.aos', 'get.aos']]))
        }
      }
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
