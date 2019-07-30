function getInitialState() {
  return []
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = {} } = action

  switch (type) {
    case 'HF_AS_DATA.AOS_MESSAGE': {
      return payload[1]
    }

    default: {
      return state
    }
  }
}

export default reducer
