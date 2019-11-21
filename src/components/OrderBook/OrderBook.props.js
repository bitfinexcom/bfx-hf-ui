import PropTypes from 'prop-types'

export const propTypes = {
  ob: PropTypes.array.isRequired,
  sumAmounts: PropTypes.bool,
  stackedView: PropTypes.bool,
}

export const defaultProps = {
  sumAmounts: true,
  stackedView: true,
}
