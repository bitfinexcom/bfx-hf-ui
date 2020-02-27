function getInitialState() {
  return {}
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = {} } = action
  const { version = '' } = payload || {}
  switch (type) {
    case 'APP_DATA_GET_RES': {
      return {
        ...state,
        version,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
