import types from '../../constants/ws'
import { balanceAdapter } from '../../adapters/ws'

function getInitialState() {
  return []
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case types.DATA_BALANCES: {
      const { balances = [] } = payload

      return balances.map(balanceAdapter)
    }

    case types.DATA_BALANCE: {
      const { balance = [] } = payload
      const adaptedBalance = balanceAdapter(balance)
      const filtered = state.filter(({ currency, context }) => context !== adaptedBalance.context || currency !== adaptedBalance.currency)

      return [
        ...filtered,
        adaptedBalance,
      ]
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
