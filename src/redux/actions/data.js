import WSHFActions from './ws-hf-server'

export default {
  syncCandles: (symbol, tf, range) => {
    const from = +range[0]
    const to = +range[1]

    return WSHFActions.send(['ds', [
      'get.candles', symbol, tf, 'trade', from, to
    ]])
  },

  getBTs: () => {
    return WSHFActions.send(['ds', ['get.bts']])
  }
}
