import _keyBy from 'lodash/keyBy'
import t from '../../constants/ws_dtc_server'

const getInitialState = () => {
  return {}
}

export default function (state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case t.DATA_STRATEGY: {
      const { id, strategy } = payload

      return {
        ...state,
        [id]: strategy,
      }
    }

    case t.DATA_STRATEGIES: {
      const { strategies } = payload
      return _keyBy(strategies, s => s.id)
    }

    case t.DEAUTH: {
      return getInitialState()
    }

    default: {
      return state
    }
  }
}
