import _isString from 'lodash/isString'

import WSHFTypes from '../constants/ws-hf-server'
import onWSOpen from './ws-hf/on_open'
import onWSClose from './ws-hf/on_close'
import onWSMessage from './ws-hf/on_message'

export default () => {
  let socket = null

  return store => next => (action = {}) => {
    if (!action) {
      console.warn('WSS Middleware received strange action', action)
      return
    }

    const { type, payload = {} } = action

    switch (type) {
      case WSHFTypes.CONNECT: {
        if (socket !== null) {
          socket.close()
        }

        socket = new window.WebSocket(payload.destination)
        socket.onmessage = onWSMessage(socket, store)
        socket.onclose = onWSClose(socket, store)
        socket.onopen = onWSOpen(socket, store)
        return socket
      }

      case WSHFTypes.CALC: {
        if (socket === null) {
          return
        }

        const { channels } = payload

        socket.send(JSON.stringify(['ds', ['bfx', [
          0, 'calc', null, channels
        ]]]))

        return
      }

      case WSHFTypes.DISCONNECT: {
        // NOTE: I cannot find the source of the disconnect action, this is
        //       temporary until it is removed/fixed
        console.warn('recv ws disconnect action, ignoring...')
        return

        /*

        if (socket !== null) {
          socket.close()
        }

        socket = null
        return
        */
      }

      case WSHFTypes.DISCONNECTED: {
        console.info('[wss] disconnected')
        return
      }

      // bfxft ws integration
      case 'WS_SEND':
      case WSHFTypes.SEND: {
        if (!socket) {
          console.warn('[socket.send] socket connection offline')
          return -1
        }
        
        const payload = type === 'WS_SEND'
          ? ['ds', ['bfx', action.payload.message]]
          : action.payload

        return socket.send(
          _isString(payload)
            ? payload
            : JSON.stringify(payload)
        )
      }

      default: {
        return next(action)
      }
    }
  }
}
