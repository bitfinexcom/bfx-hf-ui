import PropTypes from 'prop-types'

export const propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onRemove: PropTypes.func,
  headerComponents: PropTypes.any,
  hideIcons: PropTypes.bool,
  extraIcons: PropTypes.any,
  moveable: PropTypes.bool,
  removeable: PropTypes.bool,
  modal: PropTypes.any,
  darkHeader: PropTypes.bool,
}

export const defaultProps = {
  moveable: true,
  removeable: true,
  darkHeader: false,
}
