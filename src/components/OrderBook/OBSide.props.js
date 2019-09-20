import PropTypes from 'prop-types'

export const propTypes = {
  levels: PropTypes.array.isRequired,
  sumAmounts: PropTypes.bool,
}

export const defaultProps = {
  sumAmounts: true,
}
