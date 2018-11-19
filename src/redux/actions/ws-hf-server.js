import _toUpper from 'lodash/toUpper'
import _isString from 'lodash/isString'
import types from '../constants/ws-hf-server'

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

function data (msg = []) {
  let [ scope, payload ] = msg
  let [ type ] = payload

  if (type === 'bfx') {
    payload = payload[1]
    type = `bfx_${payload[1]}`
  }

  return {
    type: _toUpper(`HF_${scope}_${type}_MESSAGE`),
    payload
  }
}

function cycleConnection () {
  return {
    type: 'REST',
    meta: {
      url: '/reconnect-bfx',
      method: 'POST',
      handler: 'WS_HF_SERVER',
    },

    payload: {}
  }
}

export default {
  data,
  error,
  connect,
  connected,
  disconnect,
  disconnected,
  cycleConnection,
  send
}
