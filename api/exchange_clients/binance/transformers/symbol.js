'use strict'

module.exports = (s) => {
  const c = []

  if (s.isSpotTradingAllowed) {
    c.push('e')
  }

  if (s.isMarginTradingAllowed) {
    c.push('m')
  }

  return {
    c,
    u: `${s.baseAsset}/${s.quoteAsset}`,
    r: s.symbol,
    w: s.symbol,
    b: s.baseAsset,
    q: s.quoteAsset
  }
}
