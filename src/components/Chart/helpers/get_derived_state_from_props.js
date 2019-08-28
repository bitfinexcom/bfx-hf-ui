import _isEqual from 'lodash/isEqual'
import _last from 'lodash/last'

import genChartData from './gen_chart_data'
import calcIndicatorValuesForCandles from './calc_indicator_values_for_candles'
import { getMarketsForExchange } from '../../../redux/selectors/meta'
import { getLastCandleUpdate } from '../../../redux/selectors/ws_dtc_server'
import nearestMarket from '../../../util/nearest_market'

export default (nextProps, prevState) => {
  const {
    focusMTS, dataKey, candleData, syncCandles, activeMarket, reduxState,
    addCandlesRequirement, removeCandlesRequirement, activeExchange,
  } = nextProps

  const {
    currentExchange, currentMarket, currentTF, currentRange, marketDirty,
    exchangeDirty,
  } = prevState

  let focus = focusMTS && focusMTS !== prevState.prevFocusMTS
    ? { type: 'mts', v: focusMTS } // focusMTS changed
    : prevState.focus

  const nextState = {
    lastInternalCandleUpdate: prevState.lastInternalCandleUpdate,
    currentExchange,
    currentMarket,
    focus
  }

  // Update market & exchange w/ UI if not manually changed
  if (currentMarket && (activeMarket.r !== currentMarket.r) && !marketDirty) {
    nextState.currentMarket = activeMarket
  }

  if (activeExchange !== currentExchange && !exchangeDirty) {
    nextState.currentExchange = activeExchange

    const markets = getMarketsForExchange(reduxState, activeExchange)
    nextState.currentMarket = nearestMarket(nextState.currentMarket, markets)
  }

  const exID = nextState.currentExchange
  const mID = nextState.currentMarket.u

  if (mID !== currentMarket.u || exID !== currentExchange) {
    const exID = nextState.currentExchange
    const market = nextState.currentMarket

    syncCandles(exID, market, currentTF, currentRange) // update
    removeCandlesRequirement(currentExchange, currentMarket, currentTF)
    addCandlesRequirement(exID, market, currentTF)
  }

  const lastCandleUpdate = getLastCandleUpdate(reduxState, {
    exID: nextState.currentExchange,
    symbol: nextState.currentMarket.u,
    tf: prevState.currentTF,
  })

  if (prevState.lastCandleUpdate === lastCandleUpdate) {
    return nextState
  }

  nextState.lastCandleUpdate = lastCandleUpdate

  const start = currentRange[0]
  const candleKey = `${currentTF}:${mID}`
  const allCandles = Object.values((candleData[exID] || {})[candleKey] || {})
  const candles = allCandles.filter(({ mts }) => mts >= start)

  candles.sort((a, b) => a.mts - b.mts)

  if (candles.length === prevState.candles.length && (
    _isEqual(_last(candles), _last(prevState.candles))
  )) {
    return nextState
  }

  nextState.lastInternalCandleUpdate += 1

  if (candles.length > prevState.candles.length) {
    if (prevState.candles.length === 0) {
      focus = { type: 'index', v: candles.length - 1 }
    } else if (prevState.lastDomain) {
      const candleDelta = candles.length - prevState.candles.length

      nextState.focus = {
        type: 'domain',
        v: [
          prevState.lastDomain[0] + candleDelta,
          prevState.lastDomain[1] + candleDelta,
        ]
      }
    }
  }

  // Re-calculate indicator data
  const { indicators = [] } = prevState
  const indicatorData = {}

  indicators.forEach(i => {
    indicatorData[i.key] = calcIndicatorValuesForCandles(i, candles)
  })

  return {
    ...nextState,
    prevFocusMTS: focusMTS,
    dataKey,
    candles,
    indicatorData,

    ...genChartData(candles)
  }
}
