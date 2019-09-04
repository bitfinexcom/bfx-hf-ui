import PropTypes from 'prop-types'

export const propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  form: PropTypes.object,
  buttons: PropTypes.object,
  onClick: PropTypes.func,
}

export const defaultProps = {}
