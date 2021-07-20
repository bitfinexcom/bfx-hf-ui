import types from '../../constants/ws'

function getInitialState() {
  return {
    isLoaded: false,
    layouts: {}
  }
}

export default function reducer(state = getInitialState(), action = {}) {
  const { type, payload = {} } = action

  switch (type) {
    case types.UPDATE_LAYOUTS: {
      return {
        isLoaded: true,
        layouts: payload,
      }
    }
    default:
      return state
  }
}
