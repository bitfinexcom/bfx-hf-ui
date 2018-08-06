import WSActions from './ws'

function syncCandles(symbol, tf, range) {
  const from = +range[0]
  const to = +range[1]

  return WSActions.send(['get.candles', symbol, tf, 'trade', from, to])
}

export default { syncCandles }
