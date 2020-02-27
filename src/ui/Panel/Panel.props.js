import PropTypes from 'prop-types'

export const propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onRemove: PropTypes.func,
  closeNotificationPanel: PropTypes.func,
  headerComponents: PropTypes.any,
  secondaryHeaderComponents: PropTypes.any,
  hideIcons: PropTypes.bool,
  extraIcons: PropTypes.any,
  moveable: PropTypes.bool,
  removeable: PropTypes.bool,
  modal: PropTypes.any,
  darkHeader: PropTypes.bool,
  dark: PropTypes.bool,
}

export const defaultProps = {
  moveable: true,
  removeable: true,
  darkHeader: false,
  dark: false,
}
