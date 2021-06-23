import _filter from 'lodash/filter'
import _includes from 'lodash/includes'

import WSTypes from '../../constants/ws'
import UITypes from '../../constants/ui'
import { notificationAdapter } from '../../adapters/ws'

function getInitialState() {
  return []
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case UITypes.DATA_NOTIFICATION:
    case WSTypes.DATA_NOTIFICATION: {
      const { notification = [] } = payload
      return [
        notificationAdapter(notification),
        ...state,
      ]
    }

    case UITypes.REMOVE_NOTIFICATION: {
      const { uid } = payload
      return _filter(state, n => n.uid !== uid)
    }

    case UITypes.REMOVE_NOTIFICATIONS: {
      const { uids } = payload
      return _filter(state, n => !_includes(uids, n.uid))
    }

    case UITypes.CLEAR_NOTIFICATIONS: {
      return []
    }

    default: {
      return state
    }
  }
}

export default reducer
