function getInitialState() {
  return {
    algoOrders: [
      {
        active: false,
        id: 'bfx-accumulate_distribute',
        name: 'Accumulate/Distribute',
        meta: {},
        events: {
          self: {}, life: {}, orders: {}, data: {}, errors: {},
        },
      },
      {
        active: false,
        id: 'bfx-twap',
        name: 'TWAP',
        meta: {},
        events: {
          self: {}, life: {}, orders: {}, data: {}, errors: {},
        },
      },
      {
        active: false,
        id: 'bfx-iceberg',
        name: 'Iceberg',
        meta: {},
        events: {
          self: {}, life: {}, orders: {}, errors: {},
        },
      },
      {
        active: false,
        id: 'bfx-ping_pong',
        name: 'Ping/Pong',
        meta: {},
        events: {
          life: {}, orders: {}, errors: {},
        },
      },
    ],
  }
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = {} } = action

  switch (type) {
    case 'HF_AS_DATA.AOS_MESSAGE': {
      return payload[1]
    }
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
