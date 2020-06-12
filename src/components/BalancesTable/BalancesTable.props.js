import PropTypes from 'prop-types'

export const propTypes = {
  balances: PropTypes.array,
  hideZeroBalances: PropTypes.bool,
}

export const defaultProps = {
  balances: [],
  hideZeroBalances: true,
}
