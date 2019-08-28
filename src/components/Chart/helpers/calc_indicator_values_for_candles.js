// TODO: Pass custom indicator arguments
export default (i, candles = []) => {
  i.reset()

  const values = {}
  const dType = i.getDataType()
  const dKey = i.getDataKey()

  // TODO: Support trade indicators [none exist yet in the lib]
  if (dType !== 'candle' && dType !== '*') {
    return values
  }

  candles.forEach(c => {
    if (dKey === '*') {
      i.add(c)
    } else {
      i.add(c[dKey])
    }

    if (i.ready()) {
      values[c.mts] = i.v()
    }
  })

  return values
}
