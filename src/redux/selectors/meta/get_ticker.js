import { prepareTickers, reduxSelectors } from '@ufx-ui/bfx-containers'
import _isEmpty from 'lodash/isEmpty'
import { createSelector } from 'reselect'
import { getTickersVolumeUnit } from '../ui'

const tickersSelector = (state) => reduxSelectors.getTickers(state)
const getCurrencySymbol = state => reduxSelectors.getCurrencySymbolMemo(state)
const tickersVolumeUnit = state => getTickersVolumeUnit(state)

const getTicker = createSelector(
  [tickersSelector, getCurrencySymbol, tickersVolumeUnit, (_, market) => market],
  (tickers, _getCurrencySymbol, _tickersVolumeUnit, market) => {
    if (_isEmpty(tickers)) {
      return {}
    }
    const [preparedTicker] = prepareTickers([market.restID], tickers, _tickersVolumeUnit, _getCurrencySymbol)
    return preparedTicker || {}
  },
)

export default getTicker
