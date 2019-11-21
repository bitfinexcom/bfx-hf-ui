import PropTypes from 'prop-types'

export const propTypes = {
  savedState: PropTypes.object.isRequired,
  dark: PropTypes.bool,
}

export const defaultProps = {
  dark: false,
}
