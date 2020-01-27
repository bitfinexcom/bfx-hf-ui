export default (candles = []) => {
  const data = candles.map(c => [
    c.mts,
    c.open,
    c.close,
    c.high,
    c.low,
    c.volume,
  ])

  return { data }
}
