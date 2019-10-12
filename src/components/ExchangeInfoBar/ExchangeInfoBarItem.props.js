import PropTypes from 'prop-types'

export const propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  valuePrefix: PropTypes.string,
  valueSuffix: PropTypes.string,
  dataClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  vertical: PropTypes.bool,
}

export const defaultProps = {
  valueUnit: '',
  valueSuffix: '',
  dataClassName: '',
  labelClassName: '',
  vertical: false,
}
