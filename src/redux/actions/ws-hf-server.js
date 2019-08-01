import _toUpper from 'lodash/toUpper'
import _isString from 'lodash/isString'
import _isObject from 'lodash/isObject'
// import bfxDataActions from 'bfxuilib/dist/redux/actions/data.actions'
// import bfxWSSActions from 'bfxuilib/dist/redux/actions/websocket.actions'
import WSHFTypes from '../constants/ws-hf-server'


// const isHB = (payload = []) => {
//   const [, secondPart, thirdPart] = payload
//   return (secondPart === 'hb' || thirdPart === 'hb')
// }

export default {
  error: payload => ({
    type: WSHFTypes.ERROR,
    payload,
  }),

  send: payload => ({
    type: WSHFTypes.BUFF_SEND,
    payload: _isString(payload)
      ? payload
      : JSON.stringify(payload),
  }),

  connect: (destination = '') => ({
    type: WSHFTypes.CONNECT,
    payload: {
      destination,
    },
  }),

  connected: () => ({ type: WSHFTypes.CONNECTED }),
  disconnected: () => ({ type: WSHFTypes.DISCONNECTED }),
  disconnect: () => ({ type: WSHFTypes.DISCONNECT }),

  data: (msg = []) => {
    const [scope, payload] = msg
    const [type] = payload

    return {
      type: _toUpper(`HF_${scope}_${type}_MESSAGE`),
      payload,
    }
  },

  /**
   * Generates appropriate actions for incoming bfx wss messages. Can return
   * null if no action fits the payload.
   *
   * @param {Array} msg - array-format ws message
   * @return {Object|null} action
   */
  recvBitfinex: (msg = []) => {
    const payload = msg[1]
    console.log(msg)
    if (_isObject(payload) && payload.event) {
      switch (payload.event) {
        /*
        case 'subscribed': {
          return bfxDataActions.subscribed(payload)
        }

        case 'unsubscribed': {
          return bfxDataActions.unsubscribed(payload)
        }

        case 'auth': {
          return bfxWSSActions.authenticated(payload)
        }

        case 'error': {
          return bfxWSSActions.error(payload)
        }

        case 'info':
        case 'pong':
        case 'conf': {
          return bfxWSSActions.info(payload)
        }
        */

        default: {
          return {
            type: 'mock',
          }
        }
      }
    }

    return {
      type: 'mock',
    }


    // return (isHB(payload))
    //   ? bfxDataActions.hb(payload)
    //   : bfxDataActions.wss(payload)
  },

  recvDataServer: (payload = []) => {
    const [type] = payload

    return {
      type: _toUpper(`HF_DS_${type}_MESSAGE`),
      payload,
    }
  },

  cycleConnection: () => ({
    type: 'REST',
    meta: {
      url: '/reconnect-bfx',
      method: 'POST',
      handler: 'WS_HF_SERVER',
    },

    payload: {},
  }),
}
