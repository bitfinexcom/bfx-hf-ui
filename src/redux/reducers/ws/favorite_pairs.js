import types from '../../constants/ws'

function getInitialState() {
  return {
    favoritePairs: [],
  }
}

export default function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case types.UPDATE_FAVORITE_PAIRS: {
      return {
        ...state,
        favoritePairs: payload,
      }
    }
    default:
      return state
  }
}
