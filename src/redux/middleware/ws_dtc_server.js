import _isString from 'lodash/isString'
import Debug from 'debug'

import WSDTCTypes from '../constants/ws_dtc_server'

import onWSOpen from './ws_dtc/on_open'
import onWSClose from './ws_dtc/on_close'
import onWSMessage from './ws_dtc/on_message'

const debug = Debug('dtc:rx:m:ws-dtc-server')

export default () => {
  let socket = null

  return store => next => (action = {}) => {
    const { type, payload = {} } = action

    switch (type) {
      case WSDTCTypes.CONNECT: {
        if (socket !== null && socket.readyState < 2) {
          debug('requested connect, but already connected. closing...')
          socket.close()
        }

        socket = new window.WebSocket(payload.destination)
        socket.onmessage = onWSMessage(socket, store)
        socket.onclose = onWSClose(socket, store)
        socket.onopen = onWSOpen(socket, store)

        return
      }

      case WSDTCTypes.DISCONNECT: {
        debug('warning: recv disconnect action, ignoring...')
        return
      }

      case WSDTCTypes.CONNECTED: {
        debug('connected')
        next(action)
        break
      }

      case WSDTCTypes.DISCONNECTED: {
        debug('disconnected')
        next(action)
        break
      }

      case WSDTCTypes.SEND: {
        if (!socket || socket.readyState !== 1) {
          debug('[socket.send] can\'t send, not online')
          break
        }

        socket.send(
          _isString(payload)
            ? payload
            : JSON.stringify(payload),
        )

        break
      }

      default: {
        next(action)
        break
      }
    }
  }
}
