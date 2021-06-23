import _filter from 'lodash/filter'
import _map from 'lodash/map'
import _isEqual from 'lodash/isEqual'
import _find from 'lodash/find'

import types from '../../constants/ws'
import { positionAdapter } from '../../adapters/ws'

function getInitialState() {
  return []
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case types.DATA_POSITIONS: {
      const { positions = [] } = payload

      return _map(positions, positionAdapter)
    }

    case types.DATA_POSITION: {
      const { position = [] } = payload
      const adaptedPosition = positionAdapter(position)

      const prevPosition = _find(state, ({ id }) => id === adaptedPosition.id)
      if (_isEqual(adaptedPosition, prevPosition)) {
        return state
      }

      const filtered = _filter(state, ({ id }) => id !== adaptedPosition.id)

      return [
        ...filtered,
        adaptedPosition,
      ]
    }

    case types.DATA_POSITION_CLOSE: {
      const { position = [] } = payload
      const p = positionAdapter(position)

      return _filter(state, ({ id }) => id !== p.id)
    }

    case types.DEAUTH: {
      return getInitialState()
    }

    default: {
      return state
    }
  }
}

export default reducer
