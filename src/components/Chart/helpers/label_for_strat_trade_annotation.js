import _isFinite from 'lodash/isFinite'
import { preparePrice, prepareAmount } from 'bfx-api-node-util'

/**
 * Generates a basic info label (i.e. for tooltips) for the provided strat trade
 *
 * @param {Object} trade
 * @return {string} label
 */
export default ({
  label, amount, price, pl,
} = {}) => [
  `${amount > 0 ? 'Buy' : 'Sell'}`,
  `${prepareAmount(amount)} @ ${preparePrice(price)}`,
  _isFinite(pl) && pl > 0 ? ` | P/L ${pl}` : '',
  label,
].join(' ')
