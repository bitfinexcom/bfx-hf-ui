import _toUpper from 'lodash/toUpper'
import types from '../constants/ws'

function error(payload) {
  return {
    type: types.ERROR,
    payload,
  }
}

function send(payload) {
  return {
    type: types.SEND,
    payload,
  }
}

function connect(destination = '', autoAuth = false) {
  return {
    type: types.CONNECT,
    payload: {
      destination,
      autoAuth,
    },
  }
}

function disconnect() {
  return {
    type: types.DISCONNECT,
  }
}

function connected() {
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
  const [ msg ] = payload

  return {
    type: _toUpper(`${msg}_MESSAGE`),
    payload,
  }
}

export default {
  data,
  error,
  connect,
  connected,
  disconnect,
  disconnected,
  send,
}
