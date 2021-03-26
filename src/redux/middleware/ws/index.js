import _isString from 'lodash/isString'
import Debug from 'debug'

import WSTypes from '../../constants/ws'

import onWSOpen from './on_open'
import onWSClose from './on_close'
import onWSMessage from './on_message'

const debug = Debug('hfui:rx:m:ws-hfui-server')

export default () => {
  const sockets = [] // [{ alias, socket }, ...]

  return store => next => (action = {}) => {
    const { type, payload = {} } = action

    switch (type) {
      case WSTypes.CONNECT: {
        const { destination, alias } = payload
        let socket = sockets.find(s => s.alias === alias)

        if (!destination || !alias) {
          debug(payload)
          debug('requested connection, but no destination/alias provided. exiting...')
          return
        }

        if (socket !== null && socket.readyState < 2) {
          debug('requested connection, but already connected. closing...')
          socket.close()
        }

        socket = new window.WebSocket(destination)
        socket.onmessage = onWSMessage(socket, store)
        socket.onclose = onWSClose(socket, store)
        socket.onopen = onWSOpen(socket, store)

        sockets.push({ alias, socket })

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
        const { alias = WSTypes.ALIAS_API_SERVER, ...data } = _isString(payload) ? JSON.parse(payload) : payload
        const socket = sockets.find(s => s.alias === alias)

        if (!socket || socket.readyState !== 1) {
          debug('[socket.send] can\'t send, not online')
          break
        }

        socket.send(JSON.stringify(data))

        break
      }

      default: {
        next(action)
        break
      }
    }
  }
}
