import types from '../../constants/ws'

const getInitialState = () => {
  return {}
}

export default (state = getInitialState(), action = {}) => {
  const { type, payload = {} } = action

  switch (type) {
    case types.DATA_MARKETS: {
      const { exID, markets = [] } = payload

      return {
        ...state,
        [exID]: markets,
      }
    }

    default: {
      return state
    }
  }
}
