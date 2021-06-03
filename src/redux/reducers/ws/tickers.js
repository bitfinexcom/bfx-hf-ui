import _reduce from 'lodash/reduce'
import t from '../../constants/ws'
import { prepareTickerData } from '../../helpers/prepare_pub_sub_data'

const getInitialState = () => {
  return {}
}

export default function (state = getInitialState(), action = {}) {
  const { type, payload = {} } = action

  switch (type) {
    case t.DATA_TICKER: {
      const { channel, ticker = {} } = payload
      const [, market] = channel
      const symbol = market.restID
      return {
        ...state,
        [symbol]: ticker,
      }
    }
    case t.SET_TICKERS_DATA: {
      const tickersArray = payload
      const newState = _reduce(tickersArray, (acc, ticker) => {
        const [pair, ...rest] = ticker
        const tickerObj = prepareTickerData(rest)
        acc[pair] = tickerObj

        return acc
      }, {})
      return newState
    }

    default: {
      return state
    }
  }
}
