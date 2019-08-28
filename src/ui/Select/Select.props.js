import PropTypes from 'prop-types'

export const propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export const defaultProps = {
  className: '',
}
