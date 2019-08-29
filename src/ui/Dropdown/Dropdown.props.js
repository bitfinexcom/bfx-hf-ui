import PropTypes from 'prop-types'

export const propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  highlight: PropTypes.bool,
  fallback: PropTypes.string,
  disabled: PropTypes.bool,
  isOpen: PropTypes.bool,
}

export const defaultProps = {}
