import _keyBy from 'lodash/keyBy'

import types from '../../constants/bfx_data'
import { positionAdapter } from '../../adapters/bfx'

function getInitialState() {
  return {}
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case types.POSITIONS_SNAPSHOT: {
      const { positions = [] } = payload

      return _keyBy(positions.map(positionAdapter), p => p.symbol)
    }

    case types.POSITION_UPDATE: {
      const { position = [] } = payload

      return {
        ...state,
        ..._keyBy([positionAdapter(position)], p => p.symbol),
      }
    }

    case types.POSITION_CLOSE: {
      const { position = [] } = payload
      const p = positionAdapter(position)
      const { [p.symbol]: _, ...remainingPositions } = state

      return remainingPositions
    }

    default: {
      return state
    }
  }
}

export default reducer
