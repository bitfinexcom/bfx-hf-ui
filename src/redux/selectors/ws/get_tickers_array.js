import _get from 'lodash/get'
import _reduce from 'lodash/reduce'
import { REDUCER_PATHS } from '../../config'

const tickersPath = REDUCER_PATHS.WS
const marketsPath = REDUCER_PATHS.META

export default (state) => {
  const markets = _get(state, `${marketsPath}.markets`, [])
  const fullTickersData = _reduce(markets, (acc, market) => {
    const {
      wsID, base, quote, uiID,
    } = market
    const newTickerObject = {
      id: uiID,
      baseCcy: base,
      quoteCcy: quote,
      changePerc: _get(state, `${tickersPath}.tickers.${wsID}.dailyChangePerc`, 0),
      lastPrice: _get(state, `${tickersPath}.tickers.${wsID}.lastPrice`, 0),
      volume: _get(state, `${tickersPath}.tickers.${wsID}.volume`, 0),
    }
    acc.push(newTickerObject)
    return acc
  }, [])

  return fullTickersData
}
