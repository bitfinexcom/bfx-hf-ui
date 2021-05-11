import types from '../../constants/ws'
import { orderAdapter } from '../../adapters/ws'

const getInitialState = () => {
  return []
}

export default (state = getInitialState(), action = {}) => {
  const { type, payload = [] } = action

  switch (type) {
    case types.DATA_ORDERS: {
      const { orders = [] } = payload

      return orders.map(orderAdapter)
    }

    case types.DATA_ORDER: {
      const { order = [] } = payload
      const adapted = orderAdapter(order)
      const filtered = state.filter(({ id, gid }) => id !== adapted.id || gid !== adapted.gid)

      return [
        ...filtered,
        adapted,
      ]
    }

    case types.DATA_ORDER_CLOSE: {
      const { order = [] } = payload
      const o = orderAdapter(order)

      return state.filter(or => o.id !== or.id)
    }

    case types.DEAUTH: {
      return getInitialState()
    }

    default: {
      return state
    }
  }
}
