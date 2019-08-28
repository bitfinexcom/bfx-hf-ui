import _isArray from 'lodash/isArray'
// import bfxDataActions from 'bfxuilib/dist/redux/actions/data.actions'

import WSHFActions from '../../actions/ws_hf_server'

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

  const [ scope, msg ] = payload

  switch (scope) {
    case 'error': {
      console.error('[wss] error ', payload)
      return store.dispatch(WSHFActions.error(payload))
    }

    case 'ds': { // data server
      const [ type ] = msg

      if (type === 'bfx') {
        const action = WSHFActions.recvBitfinex(msg)

        if (!action) {
          return
        }

        return store.dispatch(action)
      } else {
        return store.dispatch(WSHFActions.recvDataServer(msg))
      }
    }

    case 'as': { // algo server
      return store.dispatch(WSHFActions.recvAlgoServer(msg))
    }

    default: {
      return store.dispatch(WSHFActions.data(payload))
    }
  }
}

