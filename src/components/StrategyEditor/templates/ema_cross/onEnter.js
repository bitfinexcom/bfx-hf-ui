export default `({ HFS, _, HFU }) => async (state = {}, update = {}) => {
  if (HFS.getNumCandles(state) < 2) { // 2 price points needed
    return state
  }

  const { price, mts } = update
  const i = HFS.indicators(state)
  const iv = HFS.indicatorValues(state)
  const { emaS } = i
  const l = iv.emaL
  const s = iv.emaS
  const amount = 1
  
  if (emaS.crossed(l)) {
    if (s > l) {
      return HFS.openLongPositionMarket(state, {
        mtsCreate: mts,
        amount,
        price,
        label: 'enter long',
      })
    } else {
      return HFS.openShortPositionMarket(state, {
        mtsCreate: mts,
        amount,
        price,
        label: 'enter short',
      })
    }
  }

  return state
}`
