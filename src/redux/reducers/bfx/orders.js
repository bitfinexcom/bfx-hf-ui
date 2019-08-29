import _keyBy from 'lodash/keyBy'
import Debug from 'debug'

import types from '../../constants/bfx_data'
import { orderAdapter } from '../../adapters/ws_dtc_server'

const debug = Debug('dtc:rx:r:orders')

function getInitialState() {
  return {}
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case types.ORDERS_SNAPSHOT: {
      const { orders = [] } = payload

      return _keyBy(orders.map(orderAdapter), o => o.id)
    }

    case types.ORDER_NEW: {
      const { order = [] } = payload

      return {
        ...state,
        ..._keyBy([orderAdapter(order)], o => o.id),
      }
    }

    case types.ORDER_UPDATE: {
      const { order = [] } = payload
      const orderM = orderAdapter(order)
      const nextState = { ...state }

      nextState[orderM.id] = orderM

      return nextState
    }

    case types.ORDER_CLOSE: {
      const { order = [] } = payload
      const orderM = orderAdapter(order)
      const orderID = orderM.id
      const { [orderID]: _, ...nextState } = state

      return nextState
    }

    case types.FLUSH_ORDER_DATA: {
      const { updates = [] } = payload
      let nextState = { ...state }
      let update

      for (let i = 0; i < updates.length; i += 1) {
        update = updates[i]
        const [, updateType, orderData] = update

        switch (updateType) {
          case 'on':
          case 'ou': {
            const o = orderAdapter(orderData)
            nextState[o.id] = o
            break
          }

          case 'oc': {
            const o = orderAdapter(orderData)
            const { [o.id]: _, ...remainingOrders } = nextState
            nextState = remainingOrders
            break
          }

          default: {
            debug('receive unknown order update type: %s', updateType)
          }
        }
      }

      return nextState
    }

    default: {
      return state
    }
  }
}

export default reducer
