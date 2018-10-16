import _isObject from 'lodash/isObject'
import _isArray from 'lodash/isArray'
import _last from 'lodash/last'
import _keyBy from 'lodash/keyBy'
import adapter from '../adapters/bts'

function getInitialState () {
  return {}
}

function reducer (state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  if (!_isArray(payload)) {
    return state
  }

  switch (type) {
    case 'DATA.BTS_MESSAGE': {
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
