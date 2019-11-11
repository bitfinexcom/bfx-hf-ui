import PropTypes from 'prop-types'

export const propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  uppercase: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
}

export const defaultProps = {
  uppercase: false,
}
