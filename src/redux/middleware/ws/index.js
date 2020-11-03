import _isString from 'lodash/isString'
import Debug from 'debug'

import WSTypes from '../../constants/ws'

import onWSOpen from './on_open'
import onWSClose from './on_close'
import onWSMessage from './on_message'

const debug = Debug('hfui:rx:m:ws-hfui-server')

export default () => {
  let socket = null

  return store => next => (action = {}) => {
    const { type, payload = {} } = action

    switch (type) {
      case WSTypes.CONNECT: {
        if (socket !== null && socket.readyState < 2) {
          debug('requested connect, but already connected. closing...')
          socket.close()
        }
        if (window.navigator.onLine) {
          socket = new window.WebSocket(payload.destination)
          socket.onmessage = onWSMessage(socket, store)
          socket.onclose = onWSClose(socket, store)
          socket.onopen = onWSOpen(socket, store)
        }
        window.addEventListener('offline', () => {
          socket.close()
        })
        return
      }

      case WSTypes.DISCONNECT: {
        debug('warning: recv disconnect action, ignoring...')
        return
      }

      case WSTypes.CONNECTED: {
        debug('connected')
        next(action)
        break
      }

      case WSTypes.DISCONNECTED: {
        debug('disconnected')
        next(action)
        break
      }

      case WSTypes.SEND: {
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
