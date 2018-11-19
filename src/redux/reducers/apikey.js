function getInitialState () {
  return {}
}

function reducer (state = getInitialState(), action = {}) {
  const { type, payload = {} } = action

  switch (type) {
    case 'API_KEY_GET_RES': {
      return payload
    }

    case 'API_KEY_POST_RES': {
      return payload
    }

    default: {
      return state
    }
  }
}

export default reducer
