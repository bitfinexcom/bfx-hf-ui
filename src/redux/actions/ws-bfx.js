import _toUpper from 'lodash/toUpper'
import _isString from 'lodash/isString'
import types from '../constants/ws-bfx'

function error(payload) {
  return {
    type: types.ERROR,
    payload,
  }
}

function send(payload) {
  return {
    type: types.BUFF_SEND,
    payload: _isString(payload)
      ? payload
      : JSON.stringify(payload),
  }
}

function connect(destination = '') {
  return {
    type: types.CONNECT,
    payload: {
      destination,
    },
  }
}

function disconnect() {
  return {
    type: types.DISCONNECT,
  }
}

function connected() {
  console.log('connected bfx')
  return {
    type: types.CONNECTED,
  }
}

function disconnected() {
  return {
    type: types.DISCONNECTED,
  }
}

function data(payload = []) {
  // [chanId, msg] = payload
  console.log(payload)
  return {
    type: _toUpper(`BFX_${payload[1]}_MESSAGE`),
    payload,
  }
}

const cycleConnection = () => ({
  type: 'REST',
  meta: {
    url: '/reconnect-bfx',
    method: 'POST',
    handler: 'BFX_WS',
  },

  payload: {},
})

export default {
  cycleConnection,
  data,
  error,
  connect,
  connected,
  disconnect,
  disconnected,
  send,
}
