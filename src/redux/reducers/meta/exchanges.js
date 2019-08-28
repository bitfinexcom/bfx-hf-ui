import types from '../../constants/ws_dtc_server'

const getInitialState = () => {
  return []
}

export default (state = getInitialState(), action = {}) => {
  const { type, payload = {} } = action

  switch (type) {
    case types.DATA_EXCHANGES: {
      const { exchanges = [] } = payload

      return exchanges
    }

    default: {
      return state
    }
  }
}
