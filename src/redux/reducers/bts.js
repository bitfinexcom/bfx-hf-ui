import _isArray from 'lodash/isArray'
import _keyBy from 'lodash/keyBy'

function getInitialState() {
  return {}
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  if (!_isArray(payload)) {
    return state
  }

  switch (type) {
    case 'DS_DATA.BTS_MESSAGE': {
      const [, btArray] = payload

      if (btArray.length === 0) {
        return state
      }

      return _keyBy(btArray, 'bt_id')
    }

    default: {
      return state
    }
  }
}

export default reducer
