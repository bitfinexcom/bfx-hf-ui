import t from '../../constants/ws'

const getInitialState = () => {
  return 0
}

export default function (state = getInitialState(), action = {}) {
  const { type, payload = {} } = action

  switch (type) {
    case t.DATA_CLIENT_STATUS_UPDATE: {
      const { status } = payload
      return status
    }

    case t.DEAUTH: {
      return getInitialState()
    }

    default: {
      return state
    }
  }
}
