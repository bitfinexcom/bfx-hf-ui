import types from '../../constants/ws'
import { orderAdapter } from '../../adapters/ws'

const getInitialState = () => {
  return {}
}

export default (state = getInitialState(), action = {}) => {
  const { type, payload = [] } = action

  switch (type) {
    case types.DATA_ORDER_CLOSE: {
      const { order = [] } = payload
      const { orders = [] } = state
      const o = orderAdapter(order)
      return {
        ...state,
        orders: [
          o,
          ...orders,
        ],
      }
    }

    default: {
      return state
    }
  }
}
