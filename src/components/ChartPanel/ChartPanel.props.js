import PropTypes from 'prop-types'

export const propTypes = {
  onRemove: PropTypes.func.isRequired,
  moveable: PropTypes.bool,
  removeable: PropTypes.bool,
  dark: PropTypes.bool,
}

export const defaultProps = {
  dark: true,
  removeable: true,
  moveable: true,
  onRemove: () => {},
}
