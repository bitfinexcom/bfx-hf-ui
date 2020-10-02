import PropTypes from 'prop-types'

export const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array.isRequired,
  onClose: PropTypes.func,
  center: PropTypes.bool,
}

export const defaultProps = {
  title: 'Settings',
}
