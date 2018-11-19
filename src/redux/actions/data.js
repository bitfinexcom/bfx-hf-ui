import WSHFActions from './ws-hf-server'

function syncCandles (symbol, tf, range) {
  const from = +range[0]
  const to = +range[1]

  return WSHFActions.send(['ds', [
    'get.candles', symbol, tf, 'trade', from, to
  ]])
}

function getBTs () {
  return WSHFActions.send(['ds', ['get.bts']])
}

export default {
  syncCandles,
  getBTs
}
