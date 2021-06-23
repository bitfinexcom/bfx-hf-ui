import { prepareTickers, reduxSelectors } from '@ufx-ui/bfx-containers'
import _isEmpty from 'lodash/isEmpty'
import { createSelector } from 'reselect'

const tickersSelector = (state) => reduxSelectors.getTickers(state)
const getCurrencySymbol = state => reduxSelectors.getCurrencySymbolMemo(state)

const getTicker = createSelector(
  [tickersSelector, getCurrencySymbol, (_, market) => market],
  (tickers, _getCurrencySymbol, market) => {
    if (_isEmpty(tickers)) {
      return {}
    }
    const [preparedTicker] = prepareTickers([market.restID], tickers, 'USD', _getCurrencySymbol)
    return preparedTicker || {}
  },
)

export default getTicker
