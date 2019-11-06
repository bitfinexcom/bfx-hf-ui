import _keyBy from 'lodash/keyBy'

import types from '../../constants/ws'
import { positionAdapter } from '../../adapters/ws'

function getInitialState() {
  return {}
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case types.DATA_POSITIONS: {
      const { exID, positions = [] } = payload

      return {
        ...state,
        [exID]: _keyBy(positions.map(positionAdapter), p => p.symbol),
      }
    }

    case types.DATA_POSITION: {
      const { exID, position = [] } = payload

      return {
        ...state,

        [exID]: {
          ...(state[exID] || {}),
          ..._keyBy([positionAdapter(position)], p => p.symbol),
        },
      }
    }

    case types.DATA_POSITION_CLOSE: {
      const { exID, position = [] } = payload
      const p = positionAdapter(position)
      const { [p.symbol]: _, ...remainingPositions } = (state[exID] || {})

      return {
        ...state,
        [exID]: remainingPositions,
      }
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
