import types from '../../constants/ws'

function getInitialState() {
  return {
    layouts: null,
  }
}

export default function reducer(state = getInitialState(), action = {}) {
  const { type, payload = {} } = action

  switch (type) {
    case types.UPDATE_LAYOUTS: {
      return {
        layouts: payload,
      }
    }
    default:
      return state
  }
}
