function getInitialState() {
  return {
    algoOrders: [
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
    ],
  }
}

function reducer(state = getInitialState(), action = {}) {
  const { type } = action

  switch (type) {
    case 'CHANGE_STATUS': {
      const { index: orderIndex } = action
      const { algoOrders } = state

      return {
        ...state,
        algoOrders: algoOrders.map((order, index) => orderIndex === index
              ? [
                ...order.slice(0, 2),
                !order[2],
                ...order.slice(3),
              ]
              : [...order]),
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
