import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const tickersPath = REDUCER_PATHS.WS
const marketsPath = REDUCER_PATHS.META

export default (state) => {
  const markets = _get(state, `${marketsPath}.markets`, [])
  const fullTickersData = markets.reduce((acc, market) => {
    const { wsID, base, quote } = market
    const newTickerObject = {
      id: wsID,
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
