import _keyBy from 'lodash/keyBy'

import types from '../../constants/ws'
import { orderAdapter } from '../../adapters/ws'

const getInitialState = () => {
  return {}
}

export default (state = getInitialState(), action = {}) => {
  const { type, payload = [] } = action

  switch (type) {
    case types.DATA_ORDERS: {
      const { exID, orders = [] } = payload

      return {
        ...state,
        [exID]: _keyBy(orders.map(orderAdapter), o => o.id),
      }
    }

    case types.DATA_ORDER: {
      const { exID, order = [] } = payload

      return {
        ...state,

        [exID]: {
          ...(state[exID] || {}),
          ..._keyBy([orderAdapter(order)], o => o.id),
        },
      }
    }

    case types.DATA_ORDER_CLOSE: {
      const { exID, order = [] } = payload
      const o = orderAdapter(order)
      const { [o.id]: _, ...remainingOrders } = (state[exID] || {})

      return {
        ...state,
        [exID]: remainingOrders,
      }
    }

    case types.DEAUTH: {
      return getInitialState()
    }

    default: {
      return state
    }
  }
}
