import _isFinite from 'lodash/isFinite'
import prepareAmount from '../../util/precision/prepare_amount'
import preparePrice from '../../util/precision/prepare_price'

/**
 * Generates a basic info label (i.e. for tooltips) for the provided strat trade
 *
 * @param {Object} trade
 * @return {string} label
 */
export const labelForStrategyTradeAnnotation = ({ label, amount, price, pl } = {}) => [
  `${amount > 0 ? 'Buy' : 'Sell'}`,
  `${prepareAmount(amount)} @ ${preparePrice(price)}`,
  _isFinite(pl) && pl > 0 ? ` | P/L ${pl}` : '',
  label
].join(' ')
