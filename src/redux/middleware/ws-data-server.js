/* eslint-disable consistent-return */
import _isArray from 'lodash/isArray'
import _isString from 'lodash/isString'

import types from '../constants/ws-data-server'
import actions from '../actions/ws-data-server'

const socketMiddleware = () => {
  let socket = null

  const onOpen = (ws, store) => () => {
    console.log('opened data')
    store.dispatch(actions.connected())
  }

  const onClose = (ws, store) => () => {
    store.dispatch(actions.disconnected())
  }

  const onMessage = (ws, store) => (e = {}) => {
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

    const [msg] = payload
    console.log(JSON.stringify(action))
    switch (msg) {
      case 'error': {
        console.error('[wss] error ', payload)
        return store.dispatch(actions.error(payload))
      }

      default: {
        return store.dispatch(actions.data(payload))
      }
    }
  }

  return store => next => (action = {}) => {
    if (!action) {
      console.warn('WSS Middleware received strange action', action)
      return
    }

    const { type, payload = {} } = action

    switch (type) {
      case types.CONNECT: {
        socket = new window.WebSocket(payload.destination)
        socket.onmessage = onMessage(socket, store)
        socket.onclose = onClose(socket, store)
        socket.onopen = onOpen(socket, store)
        return socket
      }

      case types.DISCONNECT: {
        if (socket != null) {
          socket.close()
        }
        socket = null
        return
      }

      case types.SEND: {
        console.info('[wss] send', action.payload)

        if (!socket) {
          console.warn('[socket.send] socket connection offline')
          return -1
        }

        return socket.send(
          _isString(action.payload)
            ? action.payload
            : JSON.stringify(action.payload),
        )
      }

      default: {
        return next(action)
      }
    }
  }
}

export default socketMiddleware
