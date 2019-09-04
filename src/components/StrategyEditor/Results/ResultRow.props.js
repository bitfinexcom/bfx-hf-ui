import PropTypes from 'prop-types'

export const propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export const defaultProps = {}
