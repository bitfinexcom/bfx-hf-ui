export default `({ HFS, HFU }) => async (state = {}, update = {}) => {
  const { price, mts } = update
  const i = HFS.indicators(state)
  const iv = HFS.indicatorValues(state)
  const lastTrade = _.last(state.trades)
  const { vwap, s, l, roc, rocS } = iv
  const amount = 1
  
  if (lastTrade.tag === 'elvwap' && false) {
    if (l - price > 0.7 && s > l) {
      const nextState = await HFS.closePositionMarket(state, {
        price,
        mtsCreate: mts,
        label: 'close long | rev | l-p>1 & s<l',
        tag: 'clvwap',
      })

      return HFS.openShortPositionMarket(nextState, {
        mtsCreate: mts,
        amount,
        price,
        label: 'enter short | rev | l-p>1 & s<l',
        tag: 'esrvwaprev',
      })
    }
  } else if (lastTrade.tag === 'elspike') {
    if (price > s) {
      return HFS.closePositionMarket(state, {
        price,
        mtsCreate: mts,
        label: 'close long spike',
        tag: 'clspike',
      })
    }
  } else if (lastTrade.tag === 'elrocspike') {
    if (price < s && price > vwap) {
      const nextState = await HFS.closePositionMarket(state, {
        price,
        mtsCreate: mts,
        label: 'close long | rev | p<s',
        tag: 'clvwap',
      })

      return HFS.openShortPositionMarket(nextState, {
        mtsCreate: mts,
        amount,
        price,
        label: 'enter short | rev | p<s',
        tag: 'esr',
      })
    }
  } else if (lastTrade.tag === 'elr') {
    if (price > vwap) {
      return HFS.closePositionMarket(state, {
        price,
        mtsCreate: mts,
        label: 'close long vwap',
        tag: 'clvwap',
      })
    }
  } else {
    if (price < vwap) {
      return HFS.closePositionMarket(state, {
        price,
        mtsCreate: mts,
        label: 'close long vwap',
        tag: 'clvwap',
      })
    } else if ((price < vwap - 0.25 && s < l - 0.4) || roc > 2.1) {
      const nextState = await HFS.closePositionMarket(state, {
        price,
        mtsCreate: mts,
        label: 'close long | rev | roc',
        tag: 'cl',
      })

      return HFS.openShortPositionMarket(nextState, {
        mtsCreate: mts,
        amount,
        price,
        label: 'enter short | rev | roc',
        tag: 'esrocspikerev',
      })
    }
  }
  
  return state
}`
