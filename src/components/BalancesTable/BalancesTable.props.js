import PropTypes from 'prop-types'

export const propTypes = {
  filteredBalances: PropTypes.array,
  hideZeroBalances: PropTypes.bool,
}

export const defaultProps = {
  filteredBalances: [],
  hideZeroBalances: true,
}
