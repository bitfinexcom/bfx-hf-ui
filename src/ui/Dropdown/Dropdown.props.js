import PropTypes from 'prop-types'

export const propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  highlight: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  isOpen: PropTypes.bool,
}

export const defaultProps = {
  value: '',
  placeholder: 'Select an option',
}
