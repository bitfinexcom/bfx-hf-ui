import PropTypes from 'prop-types'

export const propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onClick: PropTypes.func,
  red: PropTypes.bool,
  green: PropTypes.bool,
  blue: PropTypes.bool,
  gray: PropTypes.bool,
  className: PropTypes.string,
}

export const defaultProps = {
  className: '',
}
