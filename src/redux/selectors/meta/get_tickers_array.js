import _get from 'lodash/get'
import _reduce from 'lodash/reduce'
import { createSelector } from 'reselect'
import { reduxSelectors } from '@ufx-ui/bfx-containers'

import getMarkets from './get_markets'

const tickersSelector = state => reduxSelectors.getTickers(state)

const getTickersArray = createSelector(
  tickersSelector,
  getMarkets,
  (tickers, markets) => {
    const fullTickersData = _reduce(markets, (acc, market) => {
      const {
        wsID, base, quote, uiID, ccyLabels,
      } = market
      const newTickerObject = {
        id: uiID,
        baseCcy: base,
        quoteCcy: quote,
        changePerc: _get(tickers, `${wsID}.changePerc`, 0),
        lastPrice: _get(tickers, `${wsID}.lastPrice`, 0),
        volume: _get(tickers, `${wsID}.volume`, 0),
        ccyLabels,
      }
      acc.push(newTickerObject)
      return acc
    }, [])

    return fullTickersData
  },
)
export default getTickersArray
