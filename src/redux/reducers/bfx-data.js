const initialState = () => ({
  orders: [],
})

export default function (state = initialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case 'BFX_OS_MESSAGE': {
      return {
        ...state,
        orders: payload[2]
      }
    }

    default: {
      return state
    }
  }
}
