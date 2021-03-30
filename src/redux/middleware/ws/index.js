import _isString from 'lodash/isString'
import _omit from 'lodash/omit'
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
        if (!destination || !alias) {
          debug(payload)
          debug('requested connection, but no destination/alias provided. exiting...')
          return
        }

        let socket = sockets.find(s => s.alias === alias)
        if (socket?.readyState < 2) {
          debug('requested connection, but already connected. closing...')
          socket.close()
        }

        socket = new window.WebSocket(destination)
        socket.onmessage = onWSMessage(alias, store)
        socket.onclose = onWSClose(alias, store)
        socket.onopen = onWSOpen(alias, store)

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
        const data = _isString(payload) ? JSON.parse(payload) : payload
        const alias = data.alias || WSTypes.ALIAS_API_SERVER
        const message = data.data || data
        const socket = sockets.find(s => s.alias === alias)

        if (socket?.socket?.readyState !== 1) {
          debug('[socket.send] can\'t send, not online')
          break
        }

        socket.socket.send(JSON.stringify(Array.isArray(message) ? message : _omit(message, ['alias'])))

        break
      }

      default: {
        next(action)
        break
      }
    }
  }
}
