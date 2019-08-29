import { OrderBook } from 'bfx-api-node-models'
import _isArray from 'lodash/isArray'

import types from '../../constants/bfx_data'
import { orderBookAdapter } from '../../adapters/bfx'

function getInitialState() {
  return {}
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case types.FLUSH_BOOK_DATA: {
      const { updates = [] } = payload
      const nextState = { ...state }

      updates.forEach(([channel, data]) => {
        const { symbol /* , prec, len */ } = channel

        // TODO: Key by prec & len as well (currently not in UI)
        if (_isArray(data[0])) { // book snapshot
          nextState[symbol] = orderBookAdapter(data)
        } else {
          const ob = nextState[symbol] || []
          OrderBook.updateArrayOBWith(ob, data)
        }
      })

      return nextState
    }

    default: {
      return state
    }
  }
}

export default reducer
