/* eslint-disable */

export default `({ HFS, HFU, _ }) => async function () {
  if (this.nCandles() < 2) { // 2 price points needed
    return
  }

  const { price, mts } = this.getLastPrice()
  const i = this.indicators()
  const iv = this.indicatorValues()
  const { emaS } = i
  const l = iv.emaL
  const s = iv.emaS
  const amount = 1

  if (!this.inAPosition()) {
    if (emaS.crossed(l)) {
      if (s > l) {
        return this.openLongPositionMarket({
          label: 'enter long',
          amount,
        })
      } else {
        return this.openShortPositionMarket({
          label: 'enter short',
          amount,
        })
      }
    }
  } else {
    if (this.inALongPosition() && emaS.crossed(l) && s < l) {
      return this.closePositionMarket({ label: 'close long' })
    } else if (this.inAShortPosition() && emaS.crossed(l) && s > l) {
      return this.closePositionMarket({ label: 'close short' })
    }
  }
}`
