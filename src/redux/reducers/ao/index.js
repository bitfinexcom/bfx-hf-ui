import types from '../../constants/ao'

function getInitialState() {
  return {
    showActiveAlgoModal: false,
  }
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case types.SET_ACTIVE_AOS: {
      return {
        ...state,
        activeAlgoOrders: payload,
      }
    }

    case types.SHOW_ACTIVE_AOS_MODAL: {
      return {
        ...state,
        showActiveAlgoModal: payload,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
