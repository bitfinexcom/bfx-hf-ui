/**
 * Returns trade volume from trades
 *
 * @param {Object[]} trades
 * @return {Number} Volume from trades
 */
export default trades => trades.reduce((volume, trade) => {
  // multiply by 2 for open and close volume
  volume += Math.abs(trade.amount) * 2 * trade.price

  return volume
}, 0)
