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

      return positions.map(positionAdapter)
    }

    case types.DATA_POSITION: {
      const { position = [] } = payload
      const adaptedPosition = positionAdapter(position)
      const filtered = state.filter(({ meta = {} }) => meta.order_id !== adaptedPosition.meta?.order_id)

      return [
        ...filtered,
        adaptedPosition,
      ]
    }

    case types.DATA_POSITION_CLOSE: {
      const { position = [] } = payload
      const p = positionAdapter(position)

      return state.filter(pos => pos.symbol !== p.symbol)
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
