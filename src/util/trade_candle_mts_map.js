/**
 * Returns a map key'd by candle timestamp, with values being arrays of strategy
 * trades/orders executed within those candles
 *
 * @param {Object[]} trades
 * @param {Object[]} candles
 * @return {Object} mtsMap
 */
export default (trades = [], candles = []) => {
  if (candles.length < 2) {
    throw new Error('at least 2 candles are needed to retrieve spacing')
  }

  const candleWidth = candles[1].c.mts - candles[0].c.mts
  const mtsMap = {}

  trades.map(({ trade = {}, order }) => ({
    order,
    trade: {
      ...trade,
      candleMTS: trade.mts - (trade.mts % candleWidth),
    }
  })).forEach(({ trade = {}, order }) => {
    const { candleMTS } = trade

    if(!mtsMap[candleMTS]) {
      mtsMap[candleMTS] = []
    }

    mtsMap[candleMTS].push({ trade, order })
  })

  return mtsMap
}
