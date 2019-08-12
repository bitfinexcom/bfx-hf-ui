
function getInitialState() {
  return {}
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = {} } = action
  switch (type) {
    case 'APP_DATA_GET_RES': {
      return {
        ...payload,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer

