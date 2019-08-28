import _isString from 'lodash/isString'
import Debug from 'debug'

import WSHFTypes from '../constants/ws_hf_server'

import onWSOpen from './ws_hf/on_open'
import onWSClose from './ws_hf/on_close'
import onWSMessage from './ws_hf/on_message'

const debug = Debug('dtc:rx:m:ws-hf-server')

export default () => {
  let socket = null

  return store => next => (action = {}) => {
    const { type, payload = {} } = action

    switch (type) {
      case WSHFTypes.CONNECT: {
        if (socket !== null && socket.readyState === 1) {
          debug('requested connect, but already connected. closing...')
          socket.close()
        }

        socket = new window.WebSocket(payload.destination)
        socket.onmessage = onWSMessage(socket, store)
        socket.onclose = onWSClose(socket, store)
        socket.onopen = onWSOpen(socket, store)

        return
      }

      case WSHFTypes.CALC: {
        if (socket === null) {
          return
        }

        const { channels = [] } = payload

        socket.send(JSON.stringify(['ds', ['bfx', [
          0, 'calc', null, channels
        ]]]))

        return
      }

      case WSHFTypes.DISCONNECT: {
        debug('warning: recv disconnect action, ignoring...')
        return
      }

      case WSHFTypes.CONNECTED: {
        debug('connected')
        return next(action)
      }

      case WSHFTypes.DISCONNECTED: {
        debug('disconnected')
        return next(action)
      }

      // bfxft ws integration
      case WSHFTypes.SEND: {
        if (!socket) {
          debug('[socket.send] can\'t send, offline')
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
