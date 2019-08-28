import _toUpper from 'lodash/toUpper'
import _isString from 'lodash/isString'
import _isObject from 'lodash/isObject'
import _isFinite from 'lodash/isFinite'
import _isArray from 'lodash/isArray'

import bfxDataActions from './bfx_data'
import WSHFTypes from '../constants/ws_hf_server'

const isHB = (payload = []) => {
  const [, secondPart, thirdPart] = payload
  return (secondPart === 'hb' || thirdPart === 'hb')
}

export default {
  error: (payload) => ({
    type: WSHFTypes.ERROR,
    payload
  }),

  flushQueue: () => ({
    type: WSHFTypes.FLUSH_QUEUE,
    payload: {},
  }),

  send: (payload) => ({
    type: WSHFTypes.BUFF_SEND,
    payload: _isString(payload)
      ? payload
      : JSON.stringify(payload)
  }),

  sendBFX: (payload) => {
    const bfxPayload = ['ds', ['bfx', _isString(payload)
      ? JSON.parse(payload)
      : payload
    ]]

    return {
      type: WSHFTypes.BUFF_SEND,
      payload: JSON.stringify(bfxPayload)
    }
  },

  calc: (channels) => ({
    type: WSHFTypes.CALC,
    payload: {
      channels,
    }
  }),

  bfxSubscribe: (channel) => ({
    type: WSHFTypes.BFX_SUBSCRIBE,
    payload: {
      channel,
    }
  }),

  bfxUnsubscribe: (channelDataOrID) => {
    const action = {
      type: WSHFTypes.BFX_UNSUBSCRIBE,
      payload: {}
    }

    if (_isFinite(channelDataOrID)) {
      action.payload.chanId = channelDataOrID
    } else {
      action.payload.chanData = channelDataOrID
    }

    return action
  },

  connect: (destination = '') => ({
    type: WSHFTypes.CONNECT,
    payload: {
      destination
    }
  }),

  connected: () => ({ type: WSHFTypes.CONNECTED }),
  reconnected: () => ({ type: WSHFTypes.RECONNECTED }),
  disconnected: () => ({ type: WSHFTypes.DISCONNECTED }),
  disconnect: () => ({ type: WSHFTypes.DISCONNECT }),

  data: (msg = []) => {
    let [ scope, payload ] = msg
    let [ type ] = payload

    return {
      type: _toUpper(`HF_${scope}_${type}_MESSAGE`),
      payload
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

    if (_isArray(payload)) {
      if (isHB(payload)) {
        return // TODO: Handle heartbeats
      }

      if (payload[0] === 0) { // auth channel
        switch (payload[1]) {
          case 'os': {
            return bfxDataActions.ordersSnapshot(payload[2])
          }

          case 'on':
          case 'ou':
          case 'oc': {
            return bfxDataActions.recvOrderData(payload)
          }

          /*
          case 'on': {
            return bfxDataActions.orderNew(payload[2])
          }

          case 'ou': {
            return bfxDataActions.orderUpdate(payload[2])
          }

          case 'oc': {
            return bfxDataActions.orderClose(payload[2])
          }
          */

          case 'ps': {
            return bfxDataActions.positionsSnapshot(payload[2])
          }

          case 'pu': {
            return bfxDataActions.positionUpdate(payload[2])
          }

          case 'pc': {
            return bfxDataActions.positionClose(payload[2])
          }

          case 'n': {
            if (payload[2][1] !== 'ucm-hb') {
              return bfxDataActions.notification(payload[2])
            } else {
              break
            }
          }

          default: {
            return null
          }
        }
      } else {
        return bfxDataActions.recvChannelData(payload)
      }
    } else if (_isObject(payload) && payload.event) {
      switch (payload.event) {
        case 'subscribed': {
          return bfxDataActions.subscribed(payload)
        }

        case 'unsubscribed': {
          return bfxDataActions.unsubscribed(payload)
        }

        /*
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
          return null
        }
      }
    }

    return null
  },

  recvDataServer: (payload = []) => {
    const [ type ] = payload

    return {
      type: _toUpper(`HF_DS_${type}_MESSAGE`),
      payload
    }
  },

  recvAlgoServer: (payload = []) => {
    const [ type ] = payload

    return {
      type: _toUpper(`HF_AS_${type}_MESSAGE`),
      payload
    }
  },

  cycleConnection: () => {
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
}
