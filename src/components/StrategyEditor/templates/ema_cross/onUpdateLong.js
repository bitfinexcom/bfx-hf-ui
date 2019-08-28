export default `({ HFS, HFU }) => async (state = {}, update = {}) => {
  const { price, mts } = update
  const i = HFS.indicators(state)
  const iv = HFS.indicatorValues(state)
  const { emaS } = i
  const l = iv.emaL
  const s = iv.emaS
  
  if (emaS.crossed(l) && s < l) {
    return HFS.closePositionMarket(state, {
      price,
      mtsCreate: mts,
      label: 'close long',
    })
  }
  
  return state
}`
