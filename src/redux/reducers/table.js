function getInitialState() {
  return {
    algoOrders: [
      [42, 'bfx-ping_pong', true, null, 'Default'],
      [42, 'bfx-iceberg', true, null, 'Default'],
      [42, 'bfx-twap', true, null, 'Default'],
      [42, 'bfx-accumulate_distribute', true, null, 'Default'],
    ],
  }
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case 'CHANGE_STATUS': {
      const { index: orderIndex } = action
      const { algoOrders } = state

      return {
        ...state,
        algoOrders: algoOrders.map((order, index) => (orderIndex === index
          ? [
            ...order.slice(0, 2),
            !order[2],
            ...order.slice(3),
          ]
          : [...order])),
      }
    }

    case 'RECEIVE_ALGO_DATA': {
       const algoOrders = payload
      return {
        ...state,
        algoOrders,
      }
    }

    case 'RECEIVE_ORDERS': {
      const orders = payload
      return {
        ...state,
        orders,
      }
    }

    case 'ADD_ALGO_ORDER': {
      const algoOrders = [...state.algoOrders]
      const { algoOrder = [] } = payload
      algoOrders.unshift(algoOrder)

      return {
        ...state,
        algoOrders,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
