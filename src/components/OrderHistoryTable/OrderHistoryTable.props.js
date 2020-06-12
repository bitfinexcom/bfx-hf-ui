import PropTypes from 'prop-types'

export const propTypes = {
  onSelect: PropTypes.func,
  onRemove: PropTypes.func,
  orders: PropTypes.array,
}

export const defaultProps = {
  orders: [],
  onSelect: () => {},
  onRemove: () => {},
}
