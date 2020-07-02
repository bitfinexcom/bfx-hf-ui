import types from '../../constants/ws'

/**
 * @returns {object} initialState
 */
function getInitialState() {
  return {
    currentTest: {},
    loading: false,
    executing: false,
    trades: [],
    candles: [],
  }
}

/**
 * @param {object} state - state
 * @param {object} action - action
 * @returns {object} nextState
 */
function reducer(state = getInitialState(), action = {}) {
  const { type, payload = {} } = action
  switch (type) {
    case types.BACKTEST_EXECUTE: {
      // data server has received backtest request
      // and is syncing data
      const newState = getInitialState()
      return {
        ...newState,
        loading: true,
        currentTest: payload,
      }
    }

    case types.BACKTEST_START: {
      // data server is about to start sending
      // backtest data
      return {
        ...state,
        loading: false,
        executing: true,
      }
    }

    case types.BACKTEST_END: {
      return {
        ...state,
        candles: state.candles.sort((a, b) => a.mts - b.mts),
        trades: state.trades.sort((a, b) => a.mts - b.mts),
        loading: false,
        executing: false,
      }
    }

    case types.BACKTEST_CANDLE: {
      state.candles.push(payload)
      return state
    }

    case types.BACKTEST_TRADE: {
      state.trades.push(payload)
      return state
    }

    default: {
      return state
    }
  }
}

export default reducer
