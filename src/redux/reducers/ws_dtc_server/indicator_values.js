import _keyBy from 'lodash/keyBy'
import types from '../../constants/ws_dtc_server'

function getInitialState() {
  return {}
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = {} } = action

  switch (type) {
    case types.DATA_INDICATOR_VALUES: {
      const { exID, tf, results } = payload

      return {
        ...state,
        [exID]: {
          ...(state[exID] || {}),

          [tf]: {
            ...((state[exID] || {})[tf] || {}),
            ..._keyBy(results, r => r[0]),
          },
        },
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
