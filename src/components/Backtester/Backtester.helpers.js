import _sum from 'lodash/sum'
import _min from 'lodash/min'
import _max from 'lodash/max'

export const generateResults = (btState = {}) => {
  const { strategy = {}, nCandles, nTrades } = btState
  const { trades = [] } = strategy

  const nStrategyTrades = trades.length
  const pls = trades.map(t => t.pl)
  const gains = pls.filter(pl => pl > 0)
  const losses = pls.filter(pl => pl < 0)
  const nOpens = pls.filter(pl => pl === 0).length
  const vol = _sum(trades.map(t => Math.abs(t.price * t.amount)))
  const fees = _sum(trades.map(t => t.fee))
  const totalGain = _sum(gains)
  const totalLoss = _sum(losses)
  const pf = totalGain / Math.abs(totalLoss)
  const pl = _sum(pls)
  const minPL = _min(pls)
  const maxPL = _max(pls)

  return {
    nTrades,
    nCandles,
    pf,
    pl,
    minPL,
    maxPL,
    nStrategyTrades,
    nOpens,
    vol,
    fees,

    nGains: gains.length,
    nLosses: losses.length,
    trades: trades.map(t => ({
      ...t,
      date: new Date(t.mts),
    })),
  }
}
