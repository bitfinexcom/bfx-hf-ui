import PropTypes from 'prop-types'

export const propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  uppercase: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export const defaultProps = {
  uppercase: false,
}
