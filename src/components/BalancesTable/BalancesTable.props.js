import PropTypes from 'prop-types'

export const propTypes = {
  balances: PropTypes.array.isRequired,
  hideZeroBalances: PropTypes.bool,
}

export const defaultProps = {
  hideZeroBalances: true,
}
