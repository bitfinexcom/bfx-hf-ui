import PropTypes from 'prop-types'

export const propTypes = {
  children: PropTypes.object.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func,
  fixed: PropTypes.bool,
}

export const defaultProps = {
  className: '',
}
