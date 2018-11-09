import _toUpper from 'lodash/toUpper'
import _isString from 'lodash/isString'
import types from '../constants/ws-bfx'

function error (payload) {
  return {
    type: types.ERROR,
    payload
  }
}

function send (payload) {
  return {
    type: types.BUFF_SEND,
    payload: _isString(payload)
      ? payload
      : JSON.stringify(payload)
  }
}

function connect (destination = '') {
  return {
    type: types.CONNECT,
    payload: {
      destination
    }
  }
}

function disconnect () {
  return {
    type: types.DISCONNECT
  }
}

function connected () {
  return {
    type: types.CONNECTED
  }
}

function disconnected () {
  return {
    type: types.DISCONNECTED
  }
}

function data (payload = []) {
  const [ chanId, msg ] = payload

  return {
    type: _toUpper(`BFX_${msg}_MESSAGE`),
    payload
  }
}

const cycleConnection = () => {
  return {
    type: 'REST',
    meta: {
      url: '/reconnect-bfx',
      method: 'POST',
      handler: 'BFX_WS',
    },

    payload: {}
  }
}

export default {
  cycleConnection,
  data,
  error,
  connect,
  connected,
  disconnect,
  disconnected,
  send
}
