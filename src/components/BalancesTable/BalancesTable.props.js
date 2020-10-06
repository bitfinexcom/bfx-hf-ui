import PropTypes from 'prop-types'

export const propTypes = {
  filtredBalances: PropTypes.array,
  hideZeroBalances: PropTypes.bool,
}

export const defaultProps = {
  filtredBalances: [],
  hideZeroBalances: true,
}
