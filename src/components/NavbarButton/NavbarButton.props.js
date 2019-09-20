import PropTypes from 'prop-types'

export const propTypes = {
  currentRoute: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export const defaultProps = {}
