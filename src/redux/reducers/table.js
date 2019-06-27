function getInitialState() {
  return {
    algoOrders: [[]],
  }
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = {} } = action

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

    case 'GET_ALGO_DATA': {
      const algoOrders = [
        [42, 'bfx-ping_pong', true, null, +(new Date(Date.now() - (4 * 60 * 60 * 1000)))],
        [42, 'bfx-ping_pong', true, null, +(new Date(Date.now() - (4 * 60 * 60 * 1000)))],
        [42, 'bfx-ping_pong', true, null, +(new Date(Date.now() - (4 * 60 * 60 * 1000)))],
        [42, 'bfx-ping_pong', true, null, +(new Date(Date.now() - (4 * 60 * 60 * 1000)))],
        [42, 'bfx-ping_pong', true, null, +(new Date(Date.now() - (4 * 60 * 60 * 1000)))],
        [42, 'bfx-ping_pong', true, null, +(new Date(Date.now() - (4 * 60 * 60 * 1000)))],
        [42, 'bfx-ping_pong', true, null, +(new Date(Date.now() - (4 * 60 * 60 * 1000)))],
        [42, 'bfx-ping_pong', true, null, +(new Date(Date.now() - (4 * 60 * 60 * 1000)))],
        [42, 'bfx-ping_pong', true, null, +(new Date(Date.now() - (4 * 60 * 60 * 1000)))],
        [42, 'bfx-ping_pong', true, null, +(new Date(Date.now() - (4 * 60 * 60 * 1000)))],
      ]
      return {
        ...state,
        algoOrders,
      }
    }

    case 'RECEIVE_ALGO_DATA': {
      const { data: algoOrders } = payload

      return {
        ...state,
        algoOrders,
      }
    }

    case 'ADD_ALGO_ORDER': {
      const algoOrders = [...state.algoOrders]
      const { algoOrder = [] } = payload
      algoOrders.unshift(algoOrder)

      return {
        ...state,
        algoOrders: [...algoOrders],
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
