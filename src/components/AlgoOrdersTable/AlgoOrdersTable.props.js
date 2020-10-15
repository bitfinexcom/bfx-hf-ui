import PropTypes from 'prop-types'

export const propTypes = {
  cancelOrder: PropTypes.func.isRequired,
  filteredAO: PropTypes.array,
  apiClientState: PropTypes.number.isRequired,
}

export const defaultProps = {
  filteredAO: [],
}
