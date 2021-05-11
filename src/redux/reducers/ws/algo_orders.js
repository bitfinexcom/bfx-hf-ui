import types from '../../constants/ws'

const getInitialState = () => {
  return []
}

export default (state = getInitialState(), action = {}) => {
  const { type, payload = [] } = action

  switch (type) {
    case types.DATA_ALGO_ORDERS: {
      const { aos } = payload
      return aos
    }

    case types.DATA_ALGO_ORDER: {
      const { ao } = payload
      const filtered = state.filter(({ gid }) => gid !== ao.gid)

      return [
        ...filtered,
        ao,
      ]
    }

    case types.DATA_ALGO_ORDER_STOPPED: {
      const { gid } = payload

      return state.filter(ao => ao.gid !== gid)
    }

    case types.CLEAR_ALGO_ORDERS:
    case types.DEAUTH: {
      return getInitialState()
    }

    default: {
      return state
    }
  }
}
