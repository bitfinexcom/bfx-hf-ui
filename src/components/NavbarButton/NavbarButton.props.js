import PropTypes from 'prop-types'

export const propTypes = {
  currentRoute: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

export const defaultProps = {}
