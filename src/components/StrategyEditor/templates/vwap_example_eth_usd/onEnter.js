export default `({ HFS, _, HFU }) => async (state = {}, update = {}) => {
  if (HFS.getNumCandles(state) < 1000) {
    return state
  }

  const { price, mts } = update
  const i = HFS.indicators(state)
  const iv = HFS.indicatorValues(state)
  const lastTrade = _.last(state.trades)
  const { vwap, s, l, roc } = iv
  const amount = 1
  
  if (
    (roc > 1) &&
    (s > l + 0.1 && s < vwap) &&
    (price > vwap + 0.5)
  ) {
    return HFS.openLongPositionMarket(state, {
      mtsCreate: mts,
      amount,
      price,
      label: 'enter long roc',
      tag: 'elrocspike',
    })
  }
  
  if (
    (roc < -1) &&
    (s < l - 0.1 && s > vwap) &&
    (price < vwap - 0.5)
  ) {
    return HFS.openShortPositionMarket(state, {
      mtsCreate: mts,
      amount,
      price,
      label: 'enter short roc',
      tag: 'esrocspike',
    })
  }
  
  if (
    (roc < 1) &&
    (price > vwap) &&
    (s > l + 0.1) &&
    (s > vwap + 0.5) &&
    (!lastTrade || (
      lastTrade.tag !== 'cl' || (
        lastTrade.tag === 'cl' && lastTrade.price < vwap)
    	)
    )
  ) {
    return HFS.openLongPositionMarket(state, {
      mtsCreate: mts,
      amount,
      price,
      label: 'enter long s>l>vwwap',
      tag: 'elvwap',
    })
  }

  return state
}`
