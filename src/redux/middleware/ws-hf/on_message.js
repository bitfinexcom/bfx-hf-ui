/* eslint-disable consistent-return */
import _isArray from 'lodash/isArray'
// import bfxDataActions from 'bfxuilib/dist/redux/actions/data.actions'
import WSHFActions from '../../actions/ws-hf-server'

export default (ws, store) => (e = {}) => {
  const { data = '' } = e
  let payload
  try {
    payload = JSON.parse(data)
  } catch (err) {
    console.error('[wss] error parsing JSON: ', err)
    return
  }

  if (!_isArray(payload)) {
    console.error('[wss] recv invalid ws payload: ', payload)
    return
  }

  const [scope, msg] = payload
  console.log(JSON.stringify(e))
  switch (scope) {
    case 'error': {
      console.error('[wss] error ', payload)
      return store.dispatch(WSHFActions.error(payload))
    }
    case 'as': {
      const response = payload[1]
      const [event, orders] = response
      if (event === 'data.aos') {
        store.dispatch({ type: 'RECEIVE_ORDERS', payload: orders })
      }
      return
    }
    case 'ds': { // data server
      const [type] = msg
      const serverData = msg[1] ? msg[1][2] : null
      if (Array.isArray(serverData) && serverData) {
        const event = serverData[1]
        if (event === 'ucm-submit-bfx-res-req') {
          store.dispatch(WSHFActions.send(['as', ['get.aos']]))
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
