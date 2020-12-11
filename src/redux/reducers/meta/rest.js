function getInitialState() {
  return {}
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = {} } = action

  switch (type) {
    case 'APP_DATA_GET_RES': {
      const { version = '' } = payload || {}
      return {
        ...state,
        version,
      }
    }

    case 'TOS_DATA_GET_RES': {
      return {
        ...state,
        tos: payload,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
