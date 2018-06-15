/**
 * Returns maximun profit from trades
 *
 * @param {Object[]} trades
 * @return {Number} Absolute profit value
 */
export default (trades) => {
  let peak = Number.NEGATIVE_INFINITY

  trades.reduce((balance, trade)=>{
    balance += trade.trade.pl
    
    peak = Math.max(balance, peak)

    return balance
  }, 0)

  return peak === Number.NEGATIVE_INFINITY ? 0 : peak
}