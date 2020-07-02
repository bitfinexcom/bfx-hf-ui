import _keyBy from 'lodash/keyBy'

import types from '../../constants/ws'
import { balanceAdapter } from '../../adapters/ws'

/**
 * @returns {object} initialState
 */
function getInitialState() {
  return {}
}

/**
 * @param {object} state - state
 * @param {object} action - action
 * @returns {object} nextState
 */
function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case types.DATA_BALANCES: {
      const { exID, balances = [] } = payload

      return {
        ...state,
        [exID]: _keyBy(balances.map(b => balanceAdapter(b, exID)), p => p.currency),
      }
    }

    case types.DATA_BALANCE: {
      const { exID, balance = [] } = payload
      const adaptedBalance = balanceAdapter(balance, exID)

      return {
        ...state,
        [exID]: {
          ...(state[exID] || {}),
          [adaptedBalance.currency]: adaptedBalance,
        },
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
