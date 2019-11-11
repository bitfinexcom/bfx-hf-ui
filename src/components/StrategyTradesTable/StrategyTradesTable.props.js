import PropTypes from 'prop-types'

export const propTypes = {
  label: PropTypes.string,
  trades: PropTypes.array.isRequired,
  onTradeClick: PropTypes.func.isRequired,
  dark: PropTypes.bool,
}

export const defaultProps = {
  label: 'STRATEGY TRADES',
  dark: true,
}
