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

    case 'FETCH_CANDLES_HISTORY_GET_RES': {
      return {
        ...state,
      }
    }
    default: {
      return state
    }
  }
}

export default reducer
