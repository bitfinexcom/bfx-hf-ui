import PropTypes from 'prop-types'

export const propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.any,
}

export const defaultProps = {}
