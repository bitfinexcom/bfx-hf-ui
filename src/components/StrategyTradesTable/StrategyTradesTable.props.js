import PropTypes from 'prop-types'

export const propTypes = {
  label: PropTypes.string,
  trades: PropTypes.array.isRequired,
  onTradeClick: PropTypes.func.isRequired,
}

export const defaultProps = {
  label: 'STRATEGY TRADES',
}
