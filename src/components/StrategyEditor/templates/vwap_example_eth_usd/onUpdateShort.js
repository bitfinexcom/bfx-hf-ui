/* eslint-disable */

export default `({ HFS, HFU }) => async (state = {}, update = {}) => {
  const { price, mts } = update
  const i = HFS.indicators(state)
  const iv = HFS.indicatorValues(state)
  const lastTrade = _.last(state.trades)
  const { vwap, s, l, roc, rocS } = iv
  const amount = 1

	if (
    false &&
    (lastTrade.tag === 'esrvwaprev') &&
		(price > s)
  ) {
    return HFS.closePositionMarket(state, {
      price,
      mtsCreate: mts,
      label: 'close short rvvwaprev cross s',
      tag: 'csvwaprev-cross-s',
    })
  } else if (
    false &&
    (lastTrade.tag === 'esrocspikerev') &&
    (mts - lastTrade.mts > (50 * 60 * 1000))
  ) {
    return HFS.closePositionMarket(state, {
      price,
      mtsCreate: mts,
      label: 'close short timeout',
      tag: 'csrocspikerev-timeout',
    })
  } else if (lastTrade.tag === 'esr' && price < vwap) {
    return HFS.closePositionMarket(state, {
      price,
      mtsCreate: mts,
      label: 'close short vwap',
      tag: 'csvwap',
    })
  } else if (lastTrade.tag === 'esrocspikerev' && (price < vwap || price < lastTrade.price - 3)) {
    return HFS.closePositionMarket(state, {
      price,
      mtsCreate: mts,
      label: 'close short spike vwap',
      tag: 'csrocspikerevvwap',
    })
  } else if (
    false &&
    (price < l - 2) &&
    (HFS.getCandle(state, 50).close > l)
  ) {
    const nextState = await HFS.closePositionMarket(state, {
      price,
      mtsCreate: mts,
      label: 'close short price spike',
      tag: 'csspike',
    })

    return HFS.openLongPositionMarket(nextState, {
      mtsCreate: mts,
      amount,
      price,
      label: 'enter long | rev | price spike',
      tag: 'elspike',
    })
  }
  
  if (lastTrade.tag === 'esrocspike') {
    if (price > s && price < vwap) {
      const nextState = await HFS.closePositionMarket(state, {
        price,
        mtsCreate: mts,
        label: 'close short | rev | p>s',
        tag: 'csvwap',
      })

      return HFS.openLongPositionMarket(nextState, {
        mtsCreate: mts,
        amount,
        price,
        label: 'enter long | rev | p>s',
        tag: 'elr',
      })
    }
  }
  
  return state
}`
