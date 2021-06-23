import _get from 'lodash/get'
import _reduce from 'lodash/reduce'
import _map from 'lodash/map'
import _find from 'lodash/find'
import _isEmpty from 'lodash/isEmpty'
import { createSelector } from 'reselect'
import { reduxSelectors, prepareTickers } from '@ufx-ui/bfx-containers'
import { getMarkets, getMarketTickersKeys } from '.'
import { getCurrentMode } from '../ui'
import { PAPER_MODE } from '../../reducers/ui'

const tickersSelector = state => reduxSelectors.getTickers(state)
const getCurrencySymbol = state => reduxSelectors.getCurrencySymbolMemo(state)
const currentMode = state => getCurrentMode(state)

const getTickersArray = createSelector([tickersSelector, getMarkets], (tickers, markets) => {
  const fullTickersData = _reduce(markets, (acc, market) => {
    const {
      wsID, base, quote, uiID, ccyLabels, isPerp,
    } = market
    const newTickerObject = {
      id: uiID,
      baseCcy: base,
      quoteCcy: quote,
      changePerc: _get(tickers, `${wsID}.changePerc`, 0),
      lastPrice: _get(tickers, `${wsID}.lastPrice`, 0),
      volume: _get(tickers, `${wsID}.volume`, 0),
      ccyLabels,
      wsID,
      isPerp,
      perpUI: isPerp ? uiID : null,
    }
    acc.push(newTickerObject)
    return acc
  }, [])

  return fullTickersData
})

const preparedTickersArray = createSelector(
  [
    getTickersArray,
    getMarketTickersKeys,
    tickersSelector,
    getCurrencySymbol,
    currentMode,
  ],
  (tickersArray, tickersKeys, tickers, _getCurrencySymbol, _currentMode) => {
    if (_isEmpty(tickersArray)) {
      return []
    }
    if (_currentMode === PAPER_MODE) {
      return tickersArray
    }
    const prepared = prepareTickers(tickersKeys, tickers, 'UST', _getCurrencySymbol)

    return _map(tickersArray, (ticker) => {
      const preparedTicker = _find(prepared, (_ticker) => {
        return _ticker.id === ticker.wsID
      },
      null)
      return { ...ticker, volume: preparedTicker ? preparedTicker.volumeConverted : ticker.volume }
    }, tickersArray)
  },
)
export default preparedTickersArray
