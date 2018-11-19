import PropTypes from 'prop-types'

export const propTypes = {
  onSelect: PropTypes.func,
  orders: PropTypes.array
}

export const defaultProps = {
  onSelect: () => {},
  orders: []
}
