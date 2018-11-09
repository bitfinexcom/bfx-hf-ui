import WSDSActions from './ws-data-server'

function syncCandles (symbol, tf, range) {
  const from = +range[0]
  const to = +range[1]

  return WSDSActions.send(['get.candles', symbol, tf, 'trade', from, to])
}

function getBTs () {
  return WSDSActions.send(['get.bts'])
}

export default {
  syncCandles,
  getBTs
}
